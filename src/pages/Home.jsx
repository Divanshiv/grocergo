import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Clock, Leaf } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import {
  ProductGridSkeleton,
  CategorySkeleton,
} from "../components/Loader";
import { useCategories, useProducts } from "../hooks/useProducts";
import api from "../services/api";

const Home = () => {
  const { categories, loading: catLoading } = useCategories();
  const { products: featured, loading: featuredLoading } = useProducts({
    featured: true,
  });
  const [banners, setBanners] = useState([]);
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    api.getBanners().then(({ data }) => setBanners(data));
  }, []);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      desc: "On orders over $35",
    },
    {
      icon: Clock,
      title: "Express Delivery",
      desc: "Get it in 30 minutes",
    },
    {
      icon: Shield,
      title: "Freshness Guaranteed",
      desc: "Or your money back",
    },
    {
      icon: Leaf,
      title: "100% Organic",
      desc: "Certified organic produce",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ─── Hero Banner Carousel ────────────────────── */}
      {banners.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-4 pt-6">
          <div className="relative rounded-3xl overflow-hidden h-56 md:h-72 lg:h-80">
            {banners.map((banner, idx) => (
              <div
                key={banner.id}
                className={`absolute inset-0 bg-gradient-to-r ${banner.color} transition-all duration-700 ease-in-out ${
                  idx === activeBanner
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="h-full flex flex-col justify-center px-8 md:px-16">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-white/90 text-base md:text-lg mb-6 max-w-md">
                    {banner.subtitle}
                  </p>
                  <Link
                    to={`/products?category=${banner.category}`}
                    className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors w-fit active:scale-95"
                  >
                    {banner.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBanner(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeBanner
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Features Strip ──────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <feat.icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {feat.title}
                </p>
                <p className="text-xs text-gray-500">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Categories ──────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Browse our fresh collection
            </p>
          </div>
          <Link
            to="/products"
            className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {catLoading ? (
          <CategorySkeleton />
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* ─── Featured Products ───────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Handpicked deals just for you
            </p>
          </div>
          <Link
            to="/products"
            className="text-emerald-600 font-semibold text-sm hover:text-emerald-700 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featuredLoading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ─── CTA Banner ──────────────────────────────── */}
      <section className="max-w-[1600px] mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Get Fresh Groceries Delivered
          </h2>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
            Join thousands of happy customers who get their daily essentials
            delivered fresh to their doorstep.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold py-3 px-8 rounded-xl hover:bg-emerald-50 transition-colors active:scale-95"
          >
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;