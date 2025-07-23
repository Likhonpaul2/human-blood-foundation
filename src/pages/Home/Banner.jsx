import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="bg-red-100 py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-700">
          Save Lives, Be a Hero – Donate Blood Today
        </h1>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
          >
            Join as a Donor
          </Link>
          <Link
            to="/search-donors"
            className="bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg transition"
          >
            Search Donors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
