import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  CircleUserRound,
  ExternalLink,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import './TikTokDemo.css';

const steps = [
  'User opens khgtech',
  'User clicks Continue with TikTok',
  'TikTok authorizes the requested scopes',
  'TikTok redirects to /callback',
  'khgtech displays basic profile data',
];

const TikTokDemo = () => {
  const authParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const [signedIn, setSignedIn] = useState(authParams.get('auth') === 'success');
  const [creatorInfo, setCreatorInfo] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [sessionChecked, setSessionChecked] = useState(false);
  const [creatorStatus, setCreatorStatus] = useState('');
  const [creatorError, setCreatorError] = useState('');

  const startTikTokLogin = () => {
    setSignedIn(true);
    window.location.href = '/api/tiktok-login';
  };

  const checkTikTokSession = useCallback(async () => {
    const sessionResponse = await fetch('/api/tiktok-session', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const sessionData = await sessionResponse.json();

    if (sessionResponse.ok && sessionData.authenticated) {
      setSignedIn(true);
      setAccessToken(sessionData.access_token || '');
    }

    setSessionChecked(true);
  }, []);

  const loadCreatorInfo = useCallback(async () => {
    setCreatorStatus('Loading TikTok creator information...');
    setCreatorError('');

    const creatorResponse = await fetch('/api/tiktok-creator', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const creatorData = await creatorResponse.json();

    if (!creatorResponse.ok || !creatorData.ok) {
      setCreatorStatus('');
      setCreatorError(creatorData.message || creatorData.error || 'TikTok creator info failed');
      return;
    }

    setCreatorInfo(creatorData.creator);
    setAccessToken(creatorData.access_token || '');
    setCreatorStatus('TikTok account loaded successfully.');
  }, []);

  const disconnectTikTok = async () => {
    await fetch('/api/tiktok-logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setSignedIn(false);
    setCreatorInfo(null);
    setAccessToken('');
    setCreatorError('');
    setCreatorStatus('TikTok session cleared. Connect again to authorize another account.');
  };

  useEffect(() => {
    const sessionTimer = window.setTimeout(checkTikTokSession, 0);
    return () => window.clearTimeout(sessionTimer);
  }, [checkTikTokSession]);

  useEffect(() => {
    if (sessionChecked && signedIn) {
      const loadTimer = window.setTimeout(loadCreatorInfo, 0);
      return () => window.clearTimeout(loadTimer);
    }
    return undefined;
  }, [loadCreatorInfo, sessionChecked, signedIn]);

  return (
    <div className="demo-page animate-fade-in pad-y">
      <div className="container demo-container">
        <div className="demo-header">
          <div className="badge">TikTok Login Kit</div>
          <h1 className="section-title">
            khgtech <span className="text-gradient">Login Kit Demo</span>
          </h1>
          <p>
            This screen demonstrates the complete TikTok flow for review: user sign-in,
            TikTok authorization, callback handling, and profile data usage.
          </p>
        </div>

        <div className="demo-grid">
          <section className="demo-panel">
            <div className="panel-title">
              <KeyRound size={22} />
              User Interaction
            </div>
            <p className="panel-copy">
              A khgtech user signs in with TikTok before viewing their solar energy dashboard.
            </p>
            <button className="tiktok-button" onClick={startTikTokLogin}>
              <span className="tiktok-mark">TikTok</span>
              Continue with TikTok
            </button>

            <div className="auth-box">
              <h3>TikTok Authorization Screen</h3>
              <p>The user approves TikTok access for khgtech.</p>
              <div className="permission-row">
                <ShieldCheck size={18} />
                Scope requested: user.info.basic
              </div>
              <div className="permission-row">
                <ShieldCheck size={18} />
                Scope requested: video.upload
              </div>
              <div className="permission-row">
                <ShieldCheck size={18} />
                Scope requested: video.publish
              </div>
            </div>
          </section>

          <section className="demo-panel">
            <div className="panel-title">
              <ExternalLink size={22} />
              Callback
            </div>
            <p className="panel-copy">
              After authorization, TikTok redirects the user to the configured callback URL.
            </p>
            <div className="callback-card">
              <span>Callback URL</span>
              <strong>https://khgtech.vip/callback</strong>
              <code>{'{"ok":true,"message":"TikTok callback received","method":"POST"}'}</code>
            </div>
          </section>
        </div>

        <div className="profile-panel">
          <div className="panel-title">
            <CircleUserRound size={22} />
            Data Used Inside khgtech
          </div>
          <div className="profile-grid">
            <div className="profile-card">
              {creatorInfo?.creator_avatar_url ? (
                <img className="avatar" src={creatorInfo.creator_avatar_url} alt="" />
              ) : (
                <div className="avatar">TK</div>
              )}
              <div>
                <span>{signedIn ? 'Signed in with TikTok' : 'Waiting for TikTok sign-in'}</span>
                <h3>{creatorInfo?.creator_nickname || (signedIn ? 'TikTok User' : 'Guest User')}</h3>
                <p>
                  {creatorInfo?.creator_username
                    ? `@${creatorInfo.creator_username}`
                    : signedIn
                      ? 'Authorized for posting'
                      : 'Dashboard profile'}
                </p>
              </div>
            </div>
            <ul className="scope-list">
              <li><CheckCircle2 size={18} /> open ID identifies the khgtech account.</li>
              <li><CheckCircle2 size={18} /> display name appears in the user profile.</li>
              <li><CheckCircle2 size={18} /> avatar appears beside the user profile name.</li>
              <li><CheckCircle2 size={18} /> video.upload sends selected solar videos to TikTok as drafts.</li>
              <li><CheckCircle2 size={18} /> video.publish posts user-approved solar content through TikTok.</li>
            </ul>
          </div>
          <div className="profile-actions">
            <button
              className="secondary-button"
              type="button"
              disabled={!signedIn}
              onClick={loadCreatorInfo}
            >
              Refresh TikTok Account
            </button>
            <button
              className="secondary-button danger"
              type="button"
              disabled={!signedIn}
              onClick={disconnectTikTok}
            >
              Disconnect TikTok
            </button>
          </div>
          {creatorStatus && <div className="api-status active">{creatorStatus}</div>}
          {creatorError && <div className="api-status error">{creatorError}</div>}
          {accessToken && (
            <div className="token-box">
              <span>Access token</span>
              <code>{accessToken}</code>
              <button
                className="secondary-button"
                type="button"
                onClick={() => navigator.clipboard?.writeText(accessToken)}
              >
                Copy token
              </button>
            </div>
          )}
        </div>

        <div className="flow-strip">
          {steps.map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{index + 1}</span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TikTokDemo;
