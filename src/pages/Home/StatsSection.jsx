export const StatsSection = () => {
  return (
    <section className="bg-red-600 text-white py-20 px-4 text-center">
      <h2 className="text-3xl font-bold mb-10">Our Impact</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div>
          <p className="text-4xl font-bold">1,200+</p>
          <p className="text-sm">Blood Donations</p>
        </div>
        <div>
          <p className="text-4xl font-bold">800+</p>
          <p className="text-sm">Lives Saved</p>
        </div>
        <div>
          <p className="text-4xl font-bold">300+</p>
          <p className="text-sm">Volunteers</p>
        </div>
        <div>
          <p className="text-4xl font-bold">20+</p>
          <p className="text-sm">Cities Covered</p>
        </div>
      </div>
    </section>
  );
};
