import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSearch } from "../hooks/useProducts";

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { results, search, setResults } = useSearch();
  const searchRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setResults]);

  const handleSearch = (value) => {
    setQuery(value);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(value), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setResults([]);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    setResults([]);
    setQuery("");
    setSearchOpen(false);
  };

  const navLinks = [
    { to: "/products?category=fruits", label: "Fruits" },
    { to: "/products?category=vegetables", label: "Vegetables" },
    { to: "/products?category=dairy", label: "Dairy" },
    { to: "/products?category=snacks", label: "Snacks" },
    { to: "/products?category=beverages", label: "Beverages" },
    { to: "/orders", label: "Orders" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hidden sm:block">
              GrocerGo
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md hidden md:block" ref={searchRef}>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groceries..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-emerald-500
                             focus:bg-white transition-all"
                />
              </div>
            </form>

            {/* Search Dropdown */}
            {results.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleResultClick(item.id)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {item.category}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600">
                      ${item.price.toFixed(2)}
                    </span>
                  </button>
                ))}
                <button
                  onClick={handleSubmit}
                  className="w-full px-4 py-3 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1 border-t"
                >
                  View all results <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden pb-3" ref={searchRef}>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search groceries..."
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm
                             focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </form>
            {results.length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {results.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleResultClick(item.id)}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;