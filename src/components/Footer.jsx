import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">GrocerGo</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fresh groceries delivered to your door. Quality you can trust,
            prices you'll love.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-white mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {["Fruits", "Vegetables", "Dairy", "Snacks", "Beverages"].map(
              (cat) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat.toLowerCase()}`}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Careers", "Blog", "Press"].map((item) => (
              <li key={item}>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-white mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            {["Help Center", "Contact Us", "Shipping", "Returns"].map(
              (item) => (
                <li key={item}>
                  <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GrocerGo. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;