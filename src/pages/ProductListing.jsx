import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { ProductGridSkeleton } from "../components/Loader";
import { useProducts, useCategories } from "../hooks/useProducts";

const sortOptions = [
  { value: "", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filters = useMemo(
    () => ({
      category: categoryParam,
      search: searchParam,
      sort,
    }),
    [categoryParam, searchParam, sort]
  );

  const { products, loading } = useProducts(filters);
  const { categories } = useCategories();

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) {
      params.set("category", cat);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSort("");
  };

  const activeFilters =
    (categoryParam ? 1 : 0) + (searchParam ? 1 : 0) + (sort ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ─── Breadcrumb ──────────────────────────── */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium capitalize">
          {categoryParam || searchParam
            ? categoryParam || `Search: "${searchParam}"`
            : "All Products"}
        </span>
      </nav>

      {/* ─── Header ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
            {categoryParam || (searchParam ? `Results for "${searchParam}"` : "All Products")}
          </h1>
          {!loading && (
            <p className="text-gray-500 text-sm mt-1">
              {products.length} product{products.length !== 1 && "s"} found
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl py-2.5 px-4 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters > 0 && (
              <span className="w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* ─── Sidebar Filters ──────────────────── */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block w-full lg:w-56 flex-shrink-0`}
        >
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Filters</h3>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Category
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                    !categoryParam
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "hover:bg-gray-50 text-gray-600"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 ${
                      categoryParam === cat.id
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Search */}
            {searchParam && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Search
                </h4>
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                  <span className="text-sm text-gray-600 truncate flex-1">
                    "{searchParam}"
                  </span>
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.delete("search");
                      setSearchParams(params);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ─── Product Grid ─────────────────────── */}
        <main className="flex-1">
          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters
              </p>
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;