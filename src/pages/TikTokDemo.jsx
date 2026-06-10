import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, CircleUserRound, ExternalLink, KeyRound, ShieldCheck } from 'lucide-react';
import './TikTokDemo.css';

const TikTokDemo = () => {
  const authParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const [signedIn, setSignedIn] = useState(authParams.get('auth') === 'success');
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [creatorStatus, setCreatorStatus] = useState('');
  const [creatorError, setCreatorError] = useState('');

  const startTikTokLogin = () => { window.location.href = '/api/tiktok-login'; };

  const checkTikTokSession = useCallback(async () => {
    try {
      const res = await fetch('/api/tiktok-session', { method: 'GET', headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (res.ok && data.authenticated) setSignedIn(true);
    } catch (_) {}
    setSessionChecked(true);
  }, []);

  const loadCreatorInfo = useCallback(async () => {
    setCreatorStatus('Loading TikTok account...');
    setCreatorError('');
    try {
      const res = await fetch('/api/tiktok-creator', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setCreatorStatus('');
        setCreatorError(data.message || data.error || 'Failed to load creator info');
        return;
      }
      setCreatorInfo(data.creator);
      setCreatorStatus('TikTok account connected.');
    } catch (_) {
      setCreatorError('Failed to load creator info');
    }
  }, []);

  const disconnectTikTok = async () => {
    await fetch('/api/tiktok-logout', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    setSignedIn(false);
    setCreatorInfo(null);
    setCreatorError('');
    setCreatorStatus('Session cleared. Connect again to authorize another account.');
  };

  useEffect(() => {
    const t = window.setTimeout(checkTikTokSession, 0);
    return () => window.clearTimeout(t);
  }, [checkTikTokSession]);

  useEffect(() => {
    if (sessionChecked && signedIn) {
      const t = window.setTimeout(loadCreatorInfo, 0);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [loadCreatorInfo, sessionChecked, signedIn]);

  return (
    <div className="lk-page animate-fade-in">
      <div className="container">

        {/* Header */}
        <div className="lk-header">
          <div className="badge">TikTok Integration</div>
          <h1 className="section-title">Login <span className="text-gradient">Kit</span></h1>
          <p>
            This screen demonstrates the TikTok Login Kit flow: user sign-in,
            TikTok authorization, callback handling, and profile data display.
          </p>
        </div>

        {/* Connect hero card */}
        <div className="lk-connect-card">
          <div className="lk-connect-text">
            <h2>Connect your TikTok account</h2>
            <p>
              Authorize khgtech to access your TikTok profile. You control exactly which
              permissions are granted — we only request what we need.
            </p>
          </div>
          <button className="lk-tiktok-btn" onClick={startTikTokLogin}>
            <span className="lk-tiktok-mark">TikTok</span>
            Continue with TikTok
          </button>
        </div>

        {/* 3-step flow */}
        <div className="lk-steps">

          {/* Step 01 */}
          <div className="lk-step">
            <span className="lk-step-num">01</span>
            <div className="lk-step-icon"><KeyRound size={20} /></div>
            <h3>Authorize</h3>
            <p>User clicks "Continue with TikTok" and approves the requested permission scopes.</p>
            <div className="lk-scope-list">
              <div className="lk-scope-item"><ShieldCheck size={15} />user.info.basic</div>
              <div className="lk-scope-item"><ShieldCheck size={15} />video.upload</div>
              <div className="lk-scope-item"><ShieldCheck size={15} />video.publish</div>
            </div>
          </div>

          {/* Step 02 */}
          <div className="lk-step">
            <span className="lk-step-num">02</span>
            <div className="lk-step-icon"><ExternalLink size={20} /></div>
            <h3>Callback</h3>
            <p>TikTok redirects the user back to khgtech with an authorization code.</p>
            <div className="lk-step-detail">
              <span>Callback URL</span>
              <strong>https://khgtech.vip/callback</strong>
              <code>{'{"ok":true,"message":"TikTok callback received"}'}</code>
            </div>
          </div>

          {/* Step 03 */}
          <div className="lk-step">
            <span className="lk-step-num">03</span>
            <div className="lk-step-icon"><CircleUserRound size={20} /></div>
            <h3>Profile Access</h3>
            <p>khgtech exchanges the code for an access token and loads the user's basic profile data.</p>
            <div className="lk-scope-list">
              <div className="lk-scope-item"><CheckCircle2 size={15} />Open ID (account identity)</div>
              <div className="lk-scope-item"><CheckCircle2 size={15} />Display name</div>
              <div className="lk-scope-item"><CheckCircle2 size={15} />Avatar URL</div>
            </div>
          </div>

        </div>

        {/* Live profile panel */}
        <div className="lk-profile">
          <div className="lk-profile-head">
            <div className="lk-profile-head-icon"><CircleUserRound size={18} /></div>
            <h3>Data Used Inside khgtech</h3>
          </div>

          <div className="lk-profile-body">
            <div className="lk-avatar-card">
              {creatorInfo?.creator_avatar_url ? (
                <img className="lk-avatar" src={creatorInfo.creator_avatar_url} alt="" />
              ) : (
                <div className="lk-avatar">TK</div>
              )}
              <div className="lk-avatar-info">
                <span>{signedIn ? 'Signed in with TikTok' : 'Waiting for TikTok sign-in'}</span>
                <h4>{creatorInfo?.creator_nickname || (signedIn ? 'TikTok User' : 'Guest User')}</h4>
                <p>
                  {creatorInfo?.creator_username
                    ? `@${creatorInfo.creator_username}`
                    : signedIn ? 'Authorized' : 'Not connected'}
                </p>
              </div>
            </div>

            <div className="lk-data-list">
              <div className="lk-data-item"><CheckCircle2 size={16} />open ID identifies the khgtech account.</div>
              <div className="lk-data-item"><CheckCircle2 size={16} />Display name appears in the user profile.</div>
              <div className="lk-data-item"><CheckCircle2 size={16} />Avatar appears beside the profile name.</div>
              <div className="lk-data-item"><CheckCircle2 size={16} />video.upload sends content to TikTok as drafts.</div>
              <div className="lk-data-item"><CheckCircle2 size={16} />video.publish posts approved content through TikTok.</div>
            </div>
          </div>

          <div className="lk-actions">
            <button className="lk-btn" type="button" disabled={!signedIn} onClick={loadCreatorInfo}>
              Refresh TikTok Account
            </button>
            <button className="lk-btn lk-btn-danger" type="button" disabled={!signedIn} onClick={disconnectTikTok}>
              Disconnect TikTok
            </button>
          </div>

          {creatorStatus && <div className="lk-status success">{creatorStatus}</div>}
          {creatorError && <div className="lk-status error">{creatorError}</div>}
        </div>

      </div>
    </div>
  );
};

export default TikTokDemo;
