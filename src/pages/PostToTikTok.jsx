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
  mockCreatorInfo,
  publishTikTokPost,
} from '../lib/tiktokPostingApi';
import './PostToTikTok.css';

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
const ConnectedAccount = ({ creatorInfo, loading, onUseMock, accessToken }) => {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    if (!accessToken) return;
    navigator.clipboard.writeText(accessToken).then(() => {
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
            <button className="pt-mock-btn" type="button" onClick={onUseMock}>
              <RefreshCw size={13} /> Use mock data
            </button>
          </div>

          {accessToken && (
            <div className="pt-token">
              <div className="pt-token-label">Access token</div>
              <div className="pt-token-value">{accessToken}</div>
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
const PrivacySelector = ({ options, value, setValue, error }) => (
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
          <option key={opt} value={opt}>{privacyLabels[opt] || opt}</option>
        ))}
      </select>
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
  ].filter((item) => mediaType === 'video' || !item.videoOnly);

  return (
    <Section icon={Sparkles} title="Interaction settings">
      {items.map((item) => (
        <label
          key={item.key}
          className={`pt-check-item${item.disabled ? ' disabled' : ''}`}
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
const ContentDisclosure = ({ disclosure, setDisclosure }) => (
  <Section icon={Music2} title="Content disclosure">
    <label className="pt-disclosure-item">
      <div className="pt-disclosure-text">
        <p>Does this content promote yourself, a brand, product or service?</p>
      </div>
      <input
        type="checkbox"
        checked={disclosure.promotesContent}
        onChange={(e) => setDisclosure((cur) => ({ ...cur, promotesContent: e.target.checked }))}
      />
    </label>
    <label className="pt-disclosure-item">
      <div className="pt-disclosure-text">
        <p>AI-generated content</p>
        <small>Label content that is fully or significantly generated by AI</small>
      </div>
      <input
        type="checkbox"
        checked={disclosure.aiGenerated}
        onChange={(e) => setDisclosure((cur) => ({ ...cur, aiGenerated: e.target.checked }))}
      />
    </label>
  </Section>
);

/* ── Main page ─────────────────────────────────────── */
const PostToTikTok = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [creatorInfo, setCreatorInfo] = useState(mockCreatorInfo);
  const [creatorLoading, setCreatorLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [duration, setDuration] = useState(null);
  const [caption, setCaption] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [interactions, setInteractions] = useState({ allowComments: false, allowDuet: false, allowStitch: false });
  const [disclosure, setDisclosure] = useState({ promotesContent: false, aiGenerated: false });
  const [publishState, setPublishState] = useState('idle');
  const [toast, setToast] = useState(null);
  const [apiError, setApiError] = useState('');

  const mediaType = file?.type?.startsWith('image/') ? 'photo' : 'video';

  // Check session — load creator info if authenticated
  useEffect(() => {
    let active = true;
    fetch('/api/tiktok-session', { method: 'GET', headers: { Accept: 'application/json' } })
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.authenticated) {
          setIsAuthenticated(true);
          if (d.access_token) setAccessToken(d.access_token);
          setCreatorLoading(true);
          fetchTikTokCreatorInfo()
            .then((info) => { if (active) setCreatorInfo(info); })
            .catch(() => {})
            .finally(() => { if (active) setCreatorLoading(false); });
        }
      })
      .catch(() => {});
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
    if (!caption.trim()) errors.caption = 'Caption is required and must remain editable by the creator.';
    if (!privacy) errors.privacy = 'Choose a privacy option returned by TikTok creator_info.';
    if (mediaType === 'video' && Number.isFinite(duration) && duration > creatorInfo.max_video_post_duration_sec) {
      errors.duration = `Video must be ${creatorInfo.max_video_post_duration_sec}s or less.`;
    }
    return errors;
  }, [caption, creatorInfo.max_video_post_duration_sec, duration, file, mediaType, privacy]);

  const canPublish = Object.keys(validation).length === 0
    && publishState !== 'uploading'
    && publishState !== 'processing';

  const handlePublish = async () => {
    if (!canPublish) return;
    setPublishState('uploading');
    setApiError('');
    try {
      await publishTikTokPost({
        file, caption, privacyLevel: privacy,
        allowComments: !creatorInfo.comment_disabled && interactions.allowComments,
        allowDuet: mediaType === 'video' && !creatorInfo.duet_disabled && interactions.allowDuet,
        allowStitch: mediaType === 'video' && !creatorInfo.stitch_disabled && interactions.allowStitch,
        promotesContent: disclosure.promotesContent,
        yourBrand: false, brandedContent: false,
        mediaType,
      });
      setPublishState('processing');
      window.setTimeout(() => {
        setPublishState('success');
        setToast({ type: 'success', title: 'Successfully posted to TikTok', message: 'It may take a few minutes to appear on your profile.' });
      }, 900);
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

        <div className="pt-layout">

          {/* ── Left: form ── */}
          <div className="pt-form">
            <ConnectedAccount
              creatorInfo={creatorInfo}
              loading={creatorLoading}
              accessToken={accessToken}
              onUseMock={() => { setCreatorInfo(mockCreatorInfo); setCreatorLoading(false); }}
            />
            <CaptionField caption={caption} setCaption={setCaption} error={validation.caption} />
            <PrivacySelector options={creatorInfo.privacy_level_options} value={privacy} setValue={setPrivacy} error={validation.privacy} />
            <InteractionSettings mediaType={mediaType} creatorInfo={creatorInfo} interactions={interactions} setInteractions={setInteractions} />
            <ContentDisclosure disclosure={disclosure} setDisclosure={setDisclosure} />

            <div className="pt-submit-section">
              <p className="pt-consent">By posting, you agree to TikTok's Music Usage Confirmation.</p>
              <button className="pt-submit-btn" type="button" disabled={!canPublish} onClick={handlePublish}>
                {(publishState === 'uploading' || publishState === 'processing') && (
                  <Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} />
                )}
                Share to TikTok
              </button>
              {Object.keys(validation).length > 0 && (
                <p className="pt-submit-hint">Complete the required choices above to enable publishing.</p>
              )}
              {statusText && <div className="pt-status">{statusText}</div>}
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
                  accept="video/mp4,video/quicktime,video/webm,image/jpeg,image/png"
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
