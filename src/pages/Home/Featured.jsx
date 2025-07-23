import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Featured = () => {
  const features = [
    {
      emoji: "💧",
      title: "Every Drop Counts",
      description:
        "A single donation can save up to three lives. Your contribution makes a huge impact.",
    },
    {
      emoji: "🚑",
      title: "Emergency Ready",
      description:
        "Blood is always in need during surgeries, accidents, and health conditions like anemia.",
    },
    {
      emoji: "💪",
      title: "Healthy Habit",
      description:
        "Donating blood helps reduce harmful iron stores and keeps your body balanced.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-red-50 text-center">
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-red-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Why Donate Blood?
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map(({ emoji, title, description }, i) => (
          <motion.div
            key={title}
            className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300 cursor-pointer"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-3">{emoji}</div>
            <h3 className="text-2xl font-semibold text-red-600 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
