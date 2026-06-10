import React from 'react';

const Privacy = () => {
  return (
    <div className="pad-y animate-fade-in" style={{ minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="badge" style={{ marginBottom: '1rem' }}>Legal</div>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
          Privacy <span className="text-gradient">Policy</span>
        </h1>

        <div style={{ color: 'var(--text-muted)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p><strong style={{ color: '#fff' }}>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          <p>
            This Privacy Policy describes how <strong style={{ color: '#fff' }}>khgtech</strong> ("we", "us", or "our") collects, uses, and protects information when you use our platform at <strong style={{ color: '#fff' }}>https://khgtech.vip</strong>. khgtech is a software system designed to help users streamline their workflows and perform their work more effectively.
          </p>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>1. Information We Collect</h3>
            <p>
              When you use khgtech, we may collect the following types of information:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Account and contact details you provide when registering or contacting us</li>
              <li>Usage data such as pages visited, features used, and session duration</li>
              <li>Device and browser information including IP address and browser type</li>
              <li>Basic TikTok profile information (open ID, display name, avatar) when you sign in using TikTok Login Kit</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>2. How We Use Your Information</h3>
            <p>
              khgtech uses collected information to:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Provide, operate, and improve the khgtech platform and its features</li>
              <li>Authenticate users and manage account access, including TikTok sign-in</li>
              <li>Respond to support requests and communications</li>
              <li>Analyse usage patterns to enhance the user experience</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>3. TikTok Integration</h3>
            <p>
              If you choose to connect your TikTok account, khgtech uses the <strong style={{ color: '#fff' }}>user.info.basic</strong>, <strong style={{ color: '#fff' }}>video.upload</strong>, and <strong style={{ color: '#fff' }}>video.publish</strong> scopes to enable sign-in and content posting features. We only access the permissions you explicitly grant and do not store your TikTok credentials.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>4. Information Sharing</h3>
            <p>
              We do not sell, rent, or trade your personal information. We may share information only in the following circumstances:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>With trusted service providers who assist in operating the khgtech platform, under strict confidentiality agreements</li>
              <li>When required by law, regulation, or a valid legal process</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>5. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your information from unauthorised access, disclosure, or loss. Data is encrypted in transit and access to user data is strictly controlled within our team.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>6. Data Retention</h3>
            <p>
              We retain your information only as long as necessary to provide the khgtech service or as required by law. You may request deletion of your account data at any time by contacting us.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>7. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete the personal information we hold about you. You may also withdraw consent for data processing at any time. To exercise these rights, contact us through the link below.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>8. Changes to This Policy</h3>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Updated versions will be posted at <strong style={{ color: '#fff' }}>https://khgtech.vip/privacy</strong> with a revised date.
            </p>
          </section>

          <section>
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>9. Contact Us</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
              <a href="https://khgtech.vip/contact" style={{ color: 'var(--primary-accent)' }}>https://khgtech.vip/contact</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
