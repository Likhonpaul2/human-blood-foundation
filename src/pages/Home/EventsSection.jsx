import { motion } from "framer-motion";

export const EventsSection = () => {
  const events = [
    {
      title: "Community Blood Drive",
      location: "Dhaka Medical",
      date: "Aug 15, 2025",
    },
    {
      title: "College Donation Day",
      location: "BUET Campus",
      date: "Sept 10, 2025",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white text-center">
      <motion.h2
        className="text-3xl font-bold mb-10 text-red-700"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Upcoming Campaigns
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {events.map(({ title, location, date }, index) => (
          <motion.div
            key={title}
            className="p-6 bg-red-50 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold text-red-600 mb-2">{title}</h3>
            <p className="text-sm text-gray-600">
              📍 {location} | 🗓️ {date}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
