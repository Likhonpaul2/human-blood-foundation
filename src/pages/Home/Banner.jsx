import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Banner = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="pt-19">
      <section
        className="relative h-[550px] bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 text-center"
        style={{
          backgroundImage: "url('https://i.ibb.co/JFqt8g83/banner.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 z-0" />

        {/* Framer Motion bubbles */}
        {/* <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 bg-red-300 rounded-full opacity-30 blur-2xl z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-400 rounded-full opacity-30 blur-2xl z-10"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      /> */}

        {/* Banner Content */}
        <motion.div
          className="relative z-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Save Lives, Be a Hero —
            <br className="hidden md:block" />
            Donate Blood Today
          </h1>

          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            Your one donation can make the difference between life and death for someone in need.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            {!user && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-white hover:text-red-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 border border-white"
                >
                  ❤️ Join as a Donor
                </Link>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link
                to="/search-donors"
                className="bg-white text-red-600 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
              >
                🔍 Search Donors
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Banner;
