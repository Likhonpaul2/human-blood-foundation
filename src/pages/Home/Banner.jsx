import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-br from-red-100 via-red-50 to-white py-20 px-6 text-center overflow-hidden">
      {/* Decorative Blood Drop */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-200 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-300 rounded-full opacity-30 blur-2xl animate-ping"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 leading-tight mb-6 drop-shadow">
          Save Lives, Be a Hero —
          <br className="hidden md:block" />
          Donate Blood Today
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Your one donation can make the difference between life and death for someone in need.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            ❤️ Join as a Donor
          </Link>
          <Link
            to="/search-donors"
            className="bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            🔍 Search Donors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
