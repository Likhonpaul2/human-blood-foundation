import { useState } from "react";

const ContractUs = () => {
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
    <section className="py-16 px-4 bg-white" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border rounded"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">
            Send Message
          </button>
        </form>
        <div className="mt-6 text-center text-gray-700">
          <p>📞 Phone: +880 1234-567890</p>
          <p>📧 Email: contact@bloodcare.org</p>
        </div>
      </div>
    </section>
  );
};

export default ContractUs;
