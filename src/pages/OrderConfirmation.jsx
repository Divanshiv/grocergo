import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Truck } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

const OrderConfirmation = () => {
  const { id } = useParams();
  const { getOrder } = useOrder();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-center relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10 opacity-50"></div>
        
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
            <Package className="w-6 h-6 text-gray-900" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Thank you for shopping with GrocerGo. Your fresh groceries will be on their way soon.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 inline-block min-w-[280px]">
          <p className="text-sm text-gray-500 font-medium mb-1">Order Number</p>
          <p className="text-xl font-bold text-gray-900 font-mono tracking-tight">{order.id}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/orders" className="btn-primary w-full sm:w-auto min-w-[160px]">
            View My Orders
          </Link>
          <Link to="/" className="w-full sm:w-auto min-w-[160px] btn-secondary text-center">
            Continue Shopping
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-emerald-600 font-medium">
          <Truck className="w-4 h-4" />
          Preparing for delivery to {order.address?.city}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
