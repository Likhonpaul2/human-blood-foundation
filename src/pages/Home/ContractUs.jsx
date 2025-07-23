import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="py-20 px-4 bg-white" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-red-600 mb-10">
          Contact Us
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-red-50 p-8 rounded-xl shadow-lg"
        >
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <FaPaperPlane /> Send Message
          </button>
        </form>

        <div className="mt-8 text-center text-gray-700 space-y-2">
          <p className="flex justify-center items-center gap-2">
            <FaPhoneAlt className="text-red-500" /> +880 1234-567890
          </p>
          <p className="flex justify-center items-center gap-2">
            <FaEnvelope className="text-red-500" /> contact@bloodcare.org
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
