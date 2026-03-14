import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
            -{discount}%
          </span>
        )}
        {product.organic && (
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
            Organic
          </span>
        )}
      </div>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square bg-gray-50 p-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            {/* Can put a quick view eye here if needed */}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <Link to={`/product/${product.id}`} className="block mb-1 group-hover:text-emerald-600 transition-colors">
          <h3 className="font-bold text-gray-900 line-clamp-2 min-h-[40px] leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-3">{product.unit}</p>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            disabled={product.stock === 0}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              product.stock === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : quantity > 0
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                  : 'bg-gray-900 text-white hover:bg-emerald-600 shadow-md'
            }`}
          >
            {quantity > 0 ? (
              <span className="font-bold">{quantity}</span>
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;