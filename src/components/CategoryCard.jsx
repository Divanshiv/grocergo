import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/products?category=${category.id}`}
      className="flex-shrink-0 w-32 md:w-full group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all text-center"
    >
      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
        {category.icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
      <p className="text-xs text-gray-500">{category.count} items</p>
    </Link>
  );
};

export default CategoryCard;