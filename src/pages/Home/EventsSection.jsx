export const EventsSection = () => {
  return (
    <section className="py-20 px-4 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-red-700">Upcoming Campaigns</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <div className="p-6 bg-red-50 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Community Blood Drive</h3>
          <p className="text-sm text-gray-600">📍 Dhaka Medical | 🗓️ Aug 15, 2025</p>
        </div>
        <div className="p-6 bg-red-50 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-red-600 mb-2">College Donation Day</h3>
          <p className="text-sm text-gray-600">📍 BUET Campus | 🗓️ Sept 10, 2025</p>
        </div>
      </div>
    </section>
  );
};
