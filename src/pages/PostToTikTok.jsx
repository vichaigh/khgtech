import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  FileVideo,
  Image as ImageIcon,
  Loader2,
  MessageCircle,
  Music2,
  RefreshCw,
  Send,
  Sparkles,
  UserRound,
} from 'lucide-react';
import {
  fetchTikTokCreatorInfo,
  fetchTikTokPostStatus,
  publishTikTokPost,
} from '../lib/tiktokPostingApi';
import './PostToTikTok.css';

const directPostApproved = import.meta.env.VITE_TIKTOK_DIRECT_POST_APPROVED === 'true';

const privacyLabels = {
  PUBLIC_TO_EVERYONE: 'Public',
  MUTUAL_FOLLOW_FRIENDS: 'Friends',
  FOLLOWER_OF_CREATOR: 'Followers',
  SELF_ONLY: 'Only me',
};

const formatDuration = (sec) => {
  if (!Number.isFinite(sec)) return 'Awaiting media';
  return `${Math.floor(sec / 60)}:${Math.round(sec % 60).toString().padStart(2, '0')}`;
};

const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

/* ── Toast ─────────────────────────────────────────── */
const Toast = ({ toast, onClose }) => {
  if (!toast) return null;
  return (
    <div className="pt-toast">
      <div className="pt-toast-inner">
        <span className={`pt-toast-icon ${toast.type}`}>
          {toast.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
        </span>
        <div className="pt-toast-body">
          <p>{toast.title}</p>
          <span>{toast.message}</span>
        </div>
        <button className="pt-toast-close" type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

/* ── Section wrapper ───────────────────────────────── */
const Section = ({ icon: Icon, title, children }) => (
  <div className="pt-section">
    <div className="pt-section-head">
      <span className="pt-section-icon"><Icon size={17} /></span>
      <h2>{title}</h2>
    </div>
    {children}
  </div>
);

/* ── Field error ───────────────────────────────────── */
const FieldError = ({ children }) => (
  <p className="pt-field-error"><AlertCircle size={13} />{children}</p>
);

/* ── Connected account ─────────────────────────────── */
const ConnectedAccount = ({ creatorInfo, loading, error, onConnect }) => {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    if (!creatorInfo?.access_token) return;
    navigator.clipboard.writeText(creatorInfo.access_token).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Section icon={UserRound} title="Connected account">
      {loading ? (
        <div className="pt-skeleton">
          <div className="pt-skel-row">
            <div className="pt-skel-circle" />
            <div className="pt-skel-lines">
              <div className="pt-skel-line" style={{ width: '55%' }} />
              <div className="pt-skel-line" style={{ width: '38%' }} />
            </div>
          </div>
        </div>
      ) : !creatorInfo ? (
        <div className="pt-account-row">
          <div className="pt-account-info">
            <div className="pt-avatar">TK</div>
            <div className="pt-account-text">
              <p>TikTok account</p>
              <h3>Not connected</h3>
              <span>Continue with TikTok to load your account here.</span>
            </div>
          </div>
          <button className="pt-mock-btn" type="button" onClick={onConnect}>
            <Send size={13} /> Continue with TikTok
          </button>
        </div>
      ) : (
        <>
          <div className="pt-account-row">
            <div className="pt-account-info">
              {creatorInfo.avatar_url ? (
                <img className="pt-avatar" src={creatorInfo.avatar_url} alt="" />
              ) : (
                <div className="pt-avatar">TK</div>
              )}
              <div className="pt-account-text">
                <p>Connected account</p>
                <h3>{creatorInfo.nickname}</h3>
                <span>@{creatorInfo.username}</span>
              </div>
            </div>
          </div>

          {creatorInfo.access_token && (
            <div className="pt-token">
              <div className="pt-token-label">Access token</div>
              <div className="pt-token-value">{creatorInfo.access_token}</div>
              <button className={`pt-copy-btn${copied ? ' copied' : ''}`} type="button" onClick={copyToken}>
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy token'}
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  );
};

/* ── Caption ───────────────────────────────────────── */
const CaptionField = ({ caption, setCaption, error }) => (
  <Section icon={MessageCircle} title="Caption">
    <div className="pt-field">
      <label className="pt-field-label" htmlFor="pt-caption">Caption</label>
      <textarea
        id="pt-caption"
        className="pt-textarea"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write your caption. Hashtags are allowed."
      />
      <span className="pt-char-count">{caption.length} characters</span>
      {error && <FieldError>{error}</FieldError>}
    </div>
  </Section>
);

/* ── Privacy ───────────────────────────────────────── */
const PrivacySelector = ({ options, value, setValue, error, brandedContentSelected }) => (
  <Section icon={ChevronDown} title="Privacy">
    <div className="pt-field">
      <label className="pt-field-label" htmlFor="pt-privacy">Who can view this post</label>
      <select
        id="pt-privacy"
        className="pt-select"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">Select privacy level</option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            disabled={brandedContentSelected && opt === 'SELF_ONLY'}
            title={brandedContentSelected && opt === 'SELF_ONLY' ? "Branded content visibility cannot be set to private." : undefined}
          >
            {privacyLabels[opt] || opt}
            {brandedContentSelected && opt === 'SELF_ONLY' ? ' - unavailable for branded content' : ''}
          </option>
        ))}
      </select>
      {brandedContentSelected && (
        <p className="pt-char-count" style={{ marginTop: '4px' }}>Branded content visibility cannot be set to private.</p>
      )}
      {error && <FieldError>{error}</FieldError>}
    </div>
  </Section>
);

/* ── Interaction settings ──────────────────────────── */
const InteractionSettings = ({ mediaType, creatorInfo, interactions, setInteractions }) => {
  const items = [
    { key: 'allowComments', label: 'Allow comments', disabled: creatorInfo.comment_disabled },
    { key: 'allowDuet', label: 'Allow duet', disabled: creatorInfo.duet_disabled, videoOnly: true },
    { key: 'allowStitch', label: 'Allow stitch', disabled: creatorInfo.stitch_disabled, videoOnly: true },
    { key: 'autoAddMusic', label: 'Auto-add music', photoOnly: true },
  ].filter((item) => {
    if (item.videoOnly && mediaType !== 'video') return false;
    if (item.photoOnly && mediaType !== 'photo') return false;
    return true;
  });

  return (
    <Section icon={Sparkles} title="Interaction settings">
      {items.map((item) => (
        <label
          key={item.key}
          className={`pt-check-item${item.disabled ? ' disabled' : ''}`}
          title={item.disabled ? 'Turned off in your TikTok account settings.' : undefined}
        >
          <input
            type="checkbox"
            checked={item.disabled ? false : interactions[item.key]}
            disabled={item.disabled}
            onChange={(e) => setInteractions((cur) => ({ ...cur, [item.key]: e.target.checked }))}
          />
          {item.label}
        </label>
      ))}
    </Section>
  );
};

/* ── Content disclosure ────────────────────────────── */
const ContentDisclosure = ({ disclosure, setDisclosure, privacy }) => {
  const isPrivateVisibility = privacy === 'SELF_ONLY';
  const labelText = disclosure.brandedContent
    ? "Your photo/video will be labeled as 'Paid partnership'"
    : disclosure.yourBrand
      ? "Your photo/video will be labeled as 'Promotional content'"
      : '';

  return (
    <Section icon={Music2} title="Content disclosure">
      <label className="pt-disclosure-item">
        <div className="pt-disclosure-text">
          <p>Does this content promote yourself, a brand, product or service?</p>
        </div>
        <input
          type="checkbox"
          checked={disclosure.promotesContent}
          onChange={(e) => setDisclosure((cur) => ({
            ...cur,
            promotesContent: e.target.checked,
            yourBrand: e.target.checked ? cur.yourBrand : false,
            brandedContent: e.target.checked ? cur.brandedContent : false,
          }))}
        />
      </label>

      {disclosure.promotesContent && (
        <div style={{ marginTop: '12px', paddingLeft: '8px', borderLeft: '2px solid #334155' }}>
          {[
            ['yourBrand', 'Your brand', false],
            ['brandedContent', 'Branded content', isPrivateVisibility],
          ].map(([key, label, disabled]) => (
            <label key={key} className={`pt-check-item${disabled ? ' disabled' : ''}`} style={{ marginBottom: '8px' }}>
              <input
                type="checkbox"
                checked={disclosure[key]}
                disabled={disabled}
                onChange={(e) => setDisclosure((cur) => ({ ...cur, [key]: e.target.checked }))}
              />
              {label}
            </label>
          ))}
        </div>
      )}

      {labelText && <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>{labelText}</p>}
      {isPrivateVisibility && disclosure.promotesContent && (
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Choose Public or Friends before selecting Branded content.</p>
      )}

      <label className="pt-disclosure-item" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #1e293b' }}>
        <div className="pt-disclosure-text">
          <p>AI-generated content</p>
          <small>Label content that is fully or significantly generated by AI</small>
        </div>
        <input
          type="checkbox"
          checked={disclosure.isAigc}
          onChange={(e) => setDisclosure((cur) => ({ ...cur, isAigc: e.target.checked }))}
        />
      </label>
      {disclosure.isAigc && (
        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>Your photo/video will be labeled as 'Creator labeled as AI-generated'</p>
      )}
    </Section>
  );
};

/* ── Main page ─────────────────────────────────────── */
const PostToTikTok = () => {
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [creatorLoading, setCreatorLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [duration, setDuration] = useState(null);
  const [caption, setCaption] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [interactions, setInteractions] = useState({ allowComments: false, allowDuet: false, allowStitch: false, autoAddMusic: false });
  const [disclosure, setDisclosure] = useState({ promotesContent: false, yourBrand: false, brandedContent: false, isAigc: false });
  const [publishState, setPublishState] = useState('idle');
  const [publishStatus, setPublishStatus] = useState(null);
  const [toast, setToast] = useState(null);
  const [apiError, setApiError] = useState('');

  const mediaType = file?.type?.startsWith('image/') ? 'photo' : 'video';
  const creatorAccountLooksPublic = Boolean(creatorInfo?.privacy_level_options?.includes('PUBLIC_TO_EVERYONE'));
  const unauditedPrivateAccountRequired = !directPostApproved && creatorAccountLooksPublic;

  useEffect(() => {
    let active = true;

    fetchTikTokCreatorInfo()
      .then((info) => {
        if (active) setCreatorInfo(info);
      })
      .catch((error) => {
        if (active) {
          setApiError(error.message);
          setToast({
            type: 'error',
            title: 'Creator info unavailable',
            message: 'Connect TikTok first, then return to this posting screen.',
          });
        }
      })
      .finally(() => {
        if (active) setCreatorLoading(false);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const next = e.target.files?.[0] || null;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(next);
    setDuration(null);
    setPreviewUrl(next ? URL.createObjectURL(next) : '');
  };

  const validation = useMemo(() => {
    const errors = {};
    if (!file) errors.file = 'Select the media you want to publish.';
    if (!creatorInfo) errors.account = 'Connect TikTok before publishing.';
    if (!caption.trim()) errors.caption = 'Caption is required and must remain editable by the creator.';
    if (!privacy) errors.privacy = 'Choose a privacy option returned by TikTok creator_info.';
    if (!directPostApproved && privacy && privacy !== 'SELF_ONLY') {
      errors.privacy = 'Before Direct Post audit approval, TikTok only allows SELF_ONLY posting.';
    }
    if (unauditedPrivateAccountRequired) {
      errors.account = 'Before Direct Post audit approval, TikTok requires posting test accounts to be private. Set your TikTok account to private, then reconnect.';
    }
    if (mediaType === 'video' && Number.isFinite(duration) && creatorInfo && duration > creatorInfo.max_video_post_duration_sec) {
      errors.duration = `Video duration must be ${creatorInfo.max_video_post_duration_sec} seconds or less.`;
    }
    if (creatorInfo?.reach_max_post_limit) {
      errors.account = 'You have reached your daily posting limit. Please try again later.';
    }
    if (disclosure.promotesContent && !disclosure.yourBrand && !disclosure.brandedContent) {
      errors.disclosure = 'Choose Your brand, Branded content, or both.';
    }
    if (disclosure.brandedContent && privacy === 'SELF_ONLY') {
      errors.disclosure = 'Branded content visibility cannot be set to private.';
    }
    return errors;
  }, [caption, creatorInfo, disclosure, duration, file, mediaType, privacy, unauditedPrivateAccountRequired]);

  const canPublish = Object.keys(validation).length === 0
    && publishState !== 'uploading'
    && publishState !== 'processing';

  const consentText = disclosure.brandedContent
    ? "By posting, you agree to TikTok's Branded Content Policy and Music Usage Confirmation."
    : "By posting, you agree to TikTok's Music Usage Confirmation.";

  const handlePublish = async () => {
    if (!canPublish) return;
    setPublishState('uploading');
    setPublishStatus(null);
    setApiError('');
    try {
      const publishResult = await publishTikTokPost({
        file, caption, privacyLevel: privacy,
        allowComments: !creatorInfo.comment_disabled && interactions.allowComments,
        allowDuet: mediaType === 'video' && !creatorInfo.duet_disabled && interactions.allowDuet,
        allowStitch: mediaType === 'video' && !creatorInfo.stitch_disabled && interactions.allowStitch,
        autoAddMusic: mediaType === 'photo' && interactions.autoAddMusic,
        promotesContent: disclosure.promotesContent,
        yourBrand: disclosure.yourBrand,
        brandedContent: disclosure.brandedContent,
        isAigc: disclosure.isAigc,
        mediaType,
      });

      setPublishState('processing');
      setPublishStatus({ status: 'PROCESSING_UPLOAD' });

      if (!publishResult.publish_id) {
        setToast({ type: 'success', title: 'Upload submitted to TikTok', message: 'It may take a few minutes for your content to process.' });
        return;
      }

      for (let attempt = 0; attempt < 10; attempt += 1) {
        await wait(attempt === 0 ? 1800 : 4000);
        const nextStatus = await fetchTikTokPostStatus(publishResult.publish_id);
        setPublishStatus(nextStatus);

        if (nextStatus.status === 'PUBLISH_COMPLETE') {
          setPublishState('success');
          setToast({ type: 'success', title: 'Successfully posted to TikTok', message: 'It may take a few minutes to appear on your profile.' });
          return;
        }

        if (nextStatus.status === 'FAILED') {
          throw new Error(nextStatus.fail_reason || 'TikTok processing failed');
        }
      }

      setToast({
        type: 'success',
        title: 'TikTok is still processing',
        message: 'Processing can take a few minutes. The status panel will show the latest state.',
      });
    } catch (err) {
      setPublishState('idle');
      setApiError(err.message);
      setToast({ type: 'error', title: 'Publish failed', message: err.message });
    }
  };

  const statusText = publishState === 'uploading' ? 'Uploading...'
    : publishState === 'processing' ? 'Processing...'
      : publishState === 'success' ? 'Successfully posted to TikTok'
        : '';

  return (
    <div className="pt-page animate-fade-in">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <div className="container">

        {/* Page header */}
        <div className="pt-header">
          <div className="pt-badge"><Send size={12} /> Creator review</div>
          <h1 className="pt-title">Post to TikTok</h1>
          <p className="pt-subtitle">Upload begins only after you click <strong>Share to TikTok</strong>.</p>
        </div>

        {apiError && <div className="pt-error">{apiError}</div>}
        {validation.account && creatorInfo && (
          <div className="pt-error">{validation.account}</div>
        )}

        <div className="pt-layout">

          {/* ── Left: form ── */}
          <div className="pt-form">
            <ConnectedAccount
              creatorInfo={creatorInfo}
              loading={creatorLoading}
              error={apiError}
              onConnect={() => window.location.href = '/api/tiktok-login'}
            />
            <CaptionField caption={caption} setCaption={setCaption} error={validation.caption} />
            <PrivacySelector
              options={creatorInfo?.privacy_level_options || []}
              value={privacy}
              setValue={setPrivacy}
              error={validation.privacy}
              brandedContentSelected={disclosure.brandedContent}
            />
            <InteractionSettings mediaType={mediaType} creatorInfo={creatorInfo || { comment_disabled: true, duet_disabled: true, stitch_disabled: true }} interactions={interactions} setInteractions={setInteractions} />
            <ContentDisclosure disclosure={disclosure} setDisclosure={setDisclosure} privacy={privacy} />

            <div className="pt-submit-section">
              <p className="pt-consent">{consentText}</p>
              <button className="pt-submit-btn" type="button" disabled={!canPublish} onClick={handlePublish}>
                {(publishState === 'uploading' || publishState === 'processing') && (
                  <Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} />
                )}
                Share to TikTok
              </button>
              {Object.keys(validation).length > 0 && (
                <p className="pt-submit-hint">Complete the required choices above to enable publishing.</p>
              )}
              {statusText && (
                <div className="pt-status" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '16px', background: 'rgba(56, 189, 248, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                  <span style={{ fontWeight: 600, color: '#38bdf8' }}>{statusText}</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>It may take a few minutes for your content to process.</span>
                  {publishStatus?.status && (
                    <span style={{ fontSize: '13px', color: '#7dd3fc', marginTop: '4px' }}>TikTok status: {publishStatus.status}</span>
                  )}
                  {publishStatus?.fail_reason && (
                    <span style={{ fontSize: '13px', color: '#fca5a5' }}>Reason: {publishStatus.fail_reason}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Right: sticky preview panel ── */}
          <div className="pt-preview-panel">
            <div className="pt-preview-card">
              <div className="pt-preview-card-head">
                <span>Media Preview</span>
                <span className="pt-preview-tag">
                  {file ? (mediaType === 'photo' ? 'Photo' : 'Video') : 'No media'}
                </span>
              </div>

              {/* Phone mockup frame */}
              <div className="pt-phone-frame">
                {previewUrl && mediaType === 'video' && (
                  <video
                    src={previewUrl}
                    controls
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  />
                )}
                {previewUrl && mediaType === 'photo' && (
                  <img src={previewUrl} alt="Preview" />
                )}
                {!previewUrl && (
                  <div className="pt-phone-placeholder">
                    <FileVideo size={32} />
                    <span>Select a video or photo to preview</span>
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div className="pt-upload-area">
                <input
                  className="pt-file-input"
                  type="file"
                  accept="video/mp4,video/quicktime,video/webm,image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                />
                <div className="pt-file-meta">
                  <span className="pt-file-name">{file?.name || 'No file selected'}</span>
                  <span className="pt-duration-badge">
                    <Clock3 size={12} />
                    {mediaType === 'photo' ? 'Photo post' : formatDuration(duration)}
                  </span>
                </div>
                {validation.file && <FieldError>{validation.file}</FieldError>}
                {validation.duration && <FieldError>{validation.duration}</FieldError>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostToTikTok;
