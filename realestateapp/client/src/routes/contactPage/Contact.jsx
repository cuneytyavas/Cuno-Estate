import "./contact.scss";
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    return navigate("/");
  };
  return (
    <div className="contact-section">
      <div className="container">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you! Whether you have a question, feedback,
          or need assistance, feel free to reach out to us using the form below
          or contact us directly through the provided details.
        </p>
        <div className="contact-info">
          <h2>Our Contact Information</h2>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@cunoEstate.com">contact@cunoestate.com</a>
            </li>
            <li>
              <strong>Phone:</strong> +90 (532) 000 00 00
            </li>
            <li>
              <strong>Address:</strong> Esenler/ Istanbul
            </li>
          </ul>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
