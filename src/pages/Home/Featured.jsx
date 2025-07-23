const Featured = () => {
  return (
    <section className="py-20 px-4 bg-red-50 text-center">
      <h2 className="text-4xl font-extrabold mb-12 text-red-700">
        Why Donate Blood?
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-3">💧</div>
          <h3 className="text-2xl font-semibold text-red-600 mb-2">
            Every Drop Counts
          </h3>
          <p className="text-gray-600">
            A single donation can save up to three lives. Your contribution makes a huge impact.
          </p>
        </div>
        <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-3">🚑</div>
          <h3 className="text-2xl font-semibold text-red-600 mb-2">
            Emergency Ready
          </h3>
          <p className="text-gray-600">
            Blood is always in need during surgeries, accidents, and health conditions like anemia.
          </p>
        </div>
        <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition duration-300">
          <div className="text-4xl mb-3">💪</div>
          <h3 className="text-2xl font-semibold text-red-600 mb-2">
            Healthy Habit
          </h3>
          <p className="text-gray-600">
            Donating blood helps reduce harmful iron stores and keeps your body balanced.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Featured;
