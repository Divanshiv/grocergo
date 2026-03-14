import { useCart } from '../context/CartContext';
import { Minus as MinusIcon, Plus as PlusIcon, Trash2 as TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <Link to={`/product/${item.id}`} className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-xl p-2 hide-empty">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </Link>
      
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/product/${item.id}`} className="font-bold text-gray-900 hover:text-emerald-600 transition-colors line-clamp-1">
              {item.name}
            </Link>
            <p className="text-xs text-gray-500 capitalize">{item.category} • {item.unit}</p>
          </div>
          <p className="font-extrabold text-gray-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              {item.quantity === 1 ? <TrashIcon className="w-4 h-4 text-red-500" /> : <MinusIcon className="w-4 h-4" />}
            </button>
            <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-xs font-semibold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <TrashIcon className="w-3.5 h-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;