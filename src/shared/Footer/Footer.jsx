const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Logo & Intro */}
        <div>
          <h1 className="text-2xl font-bold text-pink-500 mb-2">Human Blood Foundation</h1>
          <p className="text-sm text-gray-400">
            Saving lives one drop at a time. Join our community and make a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/blogs" className="hover:text-white">Blogs</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Donation</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/dashboard/create-donation-request" className="hover:text-white">Request Blood</a></li>
            <li><a href="/donors" className="hover:text-white">Find Donors</a></li>
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Contact</h2>
          <p className="text-sm text-gray-300">
            Email: support@bloodcare.org <br />
            Phone: +880 1234 567890 <br />
            Address: Dhaka, Bangladesh
          </p>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} BloodCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
