import React from 'react';

const Terms = () => {
  return (
    <div className="pad-y animate-fade-in" style={{ minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="badge" style={{ marginBottom: '1rem' }}>Legal</div>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          Terms of <span className="text-gradient">Service</span>
        </h1>

        <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p><strong style={{ color: '#fff' }}>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>
            Welcome to <strong style={{ color: '#fff' }}>khgtech</strong>. By accessing or using our platform at <strong style={{ color: '#fff' }}>https://khgtech.vip</strong>, you agree to be bound by these Terms of Service. khgtech is a software system that provides a platform for users to improve and manage their work processes more efficiently.
          </p>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>1. Acceptance of Terms</h3>
            <p>
              By creating an account or using any part of the khgtech platform, you confirm that you have read, understood, and agree to these Terms. If you do not agree, please do not use our service. We reserve the right to update these Terms at any time — continued use of the platform after changes means you accept the revised Terms.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>2. Description of Service</h3>
            <p>
              khgtech is a software platform designed to help individuals and teams organise, manage, and improve their work. Features may include workflow tools, integrations with third-party services (such as TikTok Login Kit and Content Posting API), and productivity utilities. We continuously develop and update the platform to serve users better.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>3. User Responsibilities</h3>
            <p>When using khgtech, you agree to:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Use the platform only for lawful purposes and in compliance with applicable laws</li>
              <li>Not attempt to gain unauthorised access to any part of the system or other users' accounts</li>
              <li>Not use the platform to distribute harmful, illegal, or misleading content</li>
              <li>Keep your account credentials secure and not share them with others</li>
              <li>Comply with the terms of any third-party services connected through khgtech (e.g. TikTok Developer Terms)</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>4. TikTok Integration</h3>
            <p>
              khgtech integrates with TikTok through TikTok Login Kit and the Content Posting API. When you connect your TikTok account, you authorise khgtech to access basic profile information and, where enabled, upload or publish content on your behalf. You remain responsible for all content you submit through the platform in accordance with TikTok's own policies.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>5. Intellectual Property</h3>
            <p>
              All software, design, and content making up the khgtech platform is owned by or licensed to khgtech. You may not copy, reverse engineer, or redistribute any part of the platform without written permission. Content you create or upload through khgtech remains your own property.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>6. Disclaimer of Warranties</h3>
            <p>
              khgtech is provided on an "as-is" and "as-available" basis. We make no warranties — express or implied — regarding the reliability, accuracy, or suitability of the platform for any particular purpose. We do not guarantee uninterrupted or error-free access to the service.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>7. Limitation of Liability</h3>
            <p>
              To the maximum extent permitted by law, khgtech and its team shall not be liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the platform — including loss of data, loss of revenue, or business interruption.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>8. Termination</h3>
            <p>
              We reserve the right to suspend or terminate your access to khgtech at any time if you violate these Terms or engage in behaviour that harms other users or the platform. You may also stop using the service at any time.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>9. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please reach out at{' '}
              <a href="https://khgtech.vip/contact" style={{ color: 'var(--primary-accent)' }}>https://khgtech.vip/contact</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
