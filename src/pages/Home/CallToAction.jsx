import { Link } from "react-router";
import { motion } from "framer-motion";

export const CallToAction = () => {
  return (
    <section className="py-20 px-6 bg-red-600 text-white text-center relative overflow-hidden">
      {/* Animated bubble decorations */}
      <motion.div
        className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Be the Lifeline Someone Needs
        </h2>
        <p className="text-lg mb-6">
          Join thousands of heroes who donate blood to save lives every day.
        </p>
        <Link
          to="/register"
          className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          ❤️ Become a Donor
        </Link>
      </motion.div>
    </section>
  );
};
