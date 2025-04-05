const ContactUs = () => (
    <div style={{
      padding: "2rem",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "800px",
      margin: "0 auto"
    }}>
      <h2 style={{
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "1.5rem"
      }}>
        Contact Us
      </h2>
  
      <p style={{
        fontSize: "1.2rem",
        color: "#555",
        lineHeight: "1.6",
        marginBottom: "2rem"
      }}>
        We'd love to hear from you! Whether you have a question, feedback, or need assistance planning your next event, feel free to get in touch.
      </p>
  
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}>
        <div>
          <label style={{
            fontSize: "1.2rem",
            color: "#333",
            marginBottom: "0.5rem",
            fontWeight: "bold"
          }}>
            Your Name
          </label>
          <input type="text" placeholder="Enter your name" style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "1rem"
          }} />
        </div>
  
        <div>
          <label style={{
            fontSize: "1.2rem",
            color: "#333",
            marginBottom: "0.5rem",
            fontWeight: "bold"
          }}>
            Your Email
          </label>
          <input type="email" placeholder="Enter your email" style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginBottom: "1rem"
          }} />
        </div>
  
        <div>
          <label style={{
            fontSize: "1.2rem",
            color: "#333",
            marginBottom: "0.5rem",
            fontWeight: "bold"
          }}>
            Message
          </label>
          <textarea placeholder="Your message here" style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
            minHeight: "150px",
            marginBottom: "1.5rem"
          }} />
        </div>
  
        <button style={{
          padding: "1rem 2rem",
          backgroundColor: "#007BFF",
          color: "white",
          fontSize: "1.2rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }} onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"} onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}>
          Send Message
        </button>
      </div>
    </div>
  );
  
  export default ContactUs;
  