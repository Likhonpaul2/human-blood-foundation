import { Link } from "react-router";

export const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-red-600 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Be the Lifeline Someone Needs</h2>
      <p className="mb-6">Join thousands of heroes who donate blood to save lives every day.</p>
      <Link
        to="/register"
        className="bg-white text-red-700 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
      >
        Become a Donor
      </Link>
    </section>
  );
};

