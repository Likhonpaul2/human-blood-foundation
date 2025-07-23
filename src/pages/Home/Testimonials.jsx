const Testimonials = () => {
  return (
    <section className="bg-red-100 py-20 px-4">
      <h2 className="text-3xl font-bold text-center text-red-700 mb-10">Success Stories</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {[
          {
            name: "Ayesha Rahman",
            msg: "I donated blood for the first time and saved a child's life. It felt amazing!",
          },
          {
            name: "Rakib Hasan",
            msg: "I received blood during surgery. Thanks to the donors, I got a second chance.",
          },
        ].map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-600 italic mb-2">“{t.msg}”</p>
            <h4 className="font-bold text-red-700">— {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials