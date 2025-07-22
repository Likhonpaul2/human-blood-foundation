const Featured = () => {
  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8 text-red-700">Why Donate Blood?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Every Drop Counts</h3>
          <p className="text-gray-600">
            A single donation can save up to three lives. Your contribution makes a huge impact.
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Emergency Ready</h3>
          <p className="text-gray-600">
            Blood is always in need during surgeries, accidents, and health conditions like anemia.
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Healthy Habit</h3>
          <p className="text-gray-600">
            Donating blood helps reduce harmful iron stores and keeps your body balanced.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Featured;
