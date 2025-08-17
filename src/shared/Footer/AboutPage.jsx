import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen pt-30">
      <h1 className="text-3xl font-bold text-red-600 mb-6">About Us</h1>
      <p className="text-gray-700 leading-relaxed mb-4">
        Welcome to <span className="font-semibold">Human Blood Foundation</span> – a platform built to
        connect blood donors with those in need. Our mission is to save lives by making blood
        donation simple, fast, and accessible for everyone.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        We believe that a single drop of blood can bring hope to someone in need. Our dedicated
        volunteers, donors, and supporters work together to create awareness and build a reliable
        donor network.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Thank you for being part of this noble journey. Together, we can make a difference!
      </p>
    </div>
  );
};

export default AboutPage;
