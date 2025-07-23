import { motion } from "framer-motion";

const steps = [
  { icon: "📝", title: "1. Register", desc: "Sign up and fill out your donor profile." },
  { icon: "📅", title: "2. Request/Donate", desc: "Search or request blood in your area." },
  { icon: "🏥", title: "3. Go to Hospital", desc: "Visit the hospital or donation center." },
  { icon: "❤️", title: "4. Save Lives", desc: "Your blood helps save lives instantly." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const HowItWorks = () => {
  return (
    <section className="bg-white py-20 px-4 text-center">
      <h2 className="text-3xl font-bold text-red-700 mb-10">How Blood Donation Works</h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-50 p-6 rounded-lg shadow cursor-pointer"
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(255, 87, 87, 0.3)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-4xl mb-3">{step.icon}</div>
            <h3 className="text-xl font-semibold text-red-600">{step.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
