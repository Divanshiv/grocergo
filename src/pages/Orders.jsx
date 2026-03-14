import { Link } from 'react-router-dom';
import { Package, Clock, ArrowRight, Home } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

const Orders = () => {
  const { orders } = useOrder();

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8">
            You haven't placed any orders with us yet. Start fresh today!
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Home className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Order Placed</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ship To</p>
                  <p className="font-semibold text-gray-900 text-emerald-600">{order.address?.firstName} {order.address?.lastName}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-gray-500 text-sm mb-0.5">Order #</p>
                <p className="font-mono text-gray-900 font-bold">{order.id}</p>
              </div>
            </div>

            {/* Order Body */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6 text-sm font-bold text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded-lg">
                <Clock className="w-4 h-4" />
                {order.status}
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Items in this order</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex-shrink-0 w-20 flex flex-col items-center">
                        <Link to={`/product/${item.id}`} className="w-16 h-16 bg-gray-50 rounded-xl p-2 mb-2 hover:ring-2 hover:ring-emerald-500 transition-all border border-gray-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        </Link>
                        <span className="text-xs font-semibold text-gray-500 text-center px-1 truncate w-full" title={item.name}>
                          {item.quantity}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:w-64 flex flex-col gap-3">
                  <button className="btn-primary w-full py-2.5 text-sm shadow-none">
                    Track Package
                  </button>
                  <button className="btn-secondary w-full py-2.5 text-sm shadow-none">
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
