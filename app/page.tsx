export default function Home() {
  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f4f9",
      margin: 0,
      padding: 0,
      color: "#333",
      minHeight: "100vh",
      lineHeight: 1.6
    }}>
      <header style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        position: "relative"
      }}>
        {/* <a href="#" style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "transparent",
          border: "1px solid #fff",
          color: "#fff",
          padding: "5px 15px",
          cursor: "pointer",
          borderRadius: 4,
          textDecoration: "none",
          fontSize: "0.9rem"
        }}>Sign in</a> */}
        <h1 style={{ margin: 0, fontSize: "2rem", letterSpacing: "1px" }}>KHG Tech</h1>
        <p style={{ margin: "5px 0 0", fontSize: "1rem", color: "#ccc" }}>CRM & TikTok Ads Integration Platform</p>
      </header>

      <div style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: "0 20px"
      }}>
        <section style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          padding: 30,
          marginBottom: 25
        }}>
          <h2 style={{
            marginTop: 0,
            color: "#1a1a1a",
            fontSize: "1.5rem",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: 10,
            display: "inline-block"
          }}>About Us</h2>
          <p>KHG Tech is a software company focused on building CRM and marketing automation solutions. We help businesses manage customer relationships and advertising campaigns efficiently.</p>
        </section>

        <section style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          padding: 30,
          marginBottom: 25
        }}>
          <h2 style={{
            marginTop: 0,
            color: "#1a1a1a",
            fontSize: "1.5rem",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: 10,
            display: "inline-block"
          }}>Our Product</h2>
          <p>Our CRM platform integrates with TikTok Ads to help businesses create, manage, and analyze advertising campaigns in one place.</p>
        </section>

        <section style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          padding: 30,
          marginBottom: 25
        }}>
          <h2 style={{
            marginTop: 0,
            color: "#1a1a1a",
            fontSize: "1.5rem",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: 10,
            display: "inline-block"
          }}>Services</h2>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>Campaign Management</li>
            <li style={{ marginBottom: 8 }}>Lead Management &amp; Synchronization</li>
            <li style={{ marginBottom: 8 }}>Analytics &amp; Reporting Dashboard</li>
            <li style={{ marginBottom: 8 }}>Audience Targeting &amp; Optimization</li>
          </ul>
        </section>

        <section style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          padding: 30,
          marginBottom: 25
        }}>
          <h2 style={{
            marginTop: 0,
            color: "#1a1a1a",
            fontSize: "1.5rem",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: 10,
            display: "inline-block"
          }}>How We Use TikTok APIs</h2>
          <p>We use TikTok Marketing API to automate campaign creation, monitor performance, and sync lead data into our CRM system for better business insights.</p>
        </section>

        <section style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          padding: 30,
          marginBottom: 25
        }}>
          <h2 style={{
            marginTop: 0,
            color: "#1a1a1a",
            fontSize: "1.5rem",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: 10,
            display: "inline-block"
          }}>Privacy Policy</h2>
          <p>We respect user privacy and do not share personal data with third parties. Data collected through TikTok APIs is used only for CRM functionality and campaign management.</p>
        </section>

        <section style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          padding: 30,
          marginBottom: 25
        }}>
          <h2 style={{
            marginTop: 0,
            color: "#1a1a1a",
            fontSize: "1.5rem",
            borderBottom: "2px solid #f0f0f0",
            paddingBottom: 10,
            display: "inline-block"
          }}>Contact</h2>
          <div>
            <p style={{ margin: "5px 0" }}>
              <strong>Email:</strong> noun.chandy@khgtech.vip
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Company:</strong> KHG Tech
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Location:</strong> Cambodia
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
