import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, CreditCard, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

const CheckoutReview = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();
  const checkoutData = location.state?.checkoutData;

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // If directly navigated to this page without filling the form, redirect back
  if (!checkoutData || cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No order details found</h2>
        <Link to="/checkout" className="btn-primary">Go to Checkout Formulation</Link>
      </div>
    );
  }

  const deliveryFee = cartTotal >= 35 ? 0 : 4.99;
  const orderTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    
    // Simulate dummy loading
    setTimeout(() => {
      const newOrder = {
        id: `GGO-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString(),
        items: [...cart],
        address: checkoutData,
        total: orderTotal,
        status: 'Processing'
      };

      addOrder(newOrder);
      clearCart();
      setIsPlacingOrder(false);
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors" disabled={isPlacingOrder}>
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Order</h1>
          <p className="text-sm text-gray-500">Step 2 of 2: Final Checkout</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Address Summary */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Delivery Details
              </h2>
              <button onClick={() => window.history.back()} className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold" disabled={isPlacingOrder}>Edit</button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
              <p className="font-semibold">{checkoutData.firstName} {checkoutData.lastName}</p>
              <p>{checkoutData.address}</p>
              <p>{checkoutData.city}, {checkoutData.state} {checkoutData.zip}</p>
              <p className="mt-2 text-gray-500">{checkoutData.email} • {checkoutData.phone}</p>
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                Payment Method
              </h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="capitalize font-medium">{checkoutData.paymentMethod}</span>
            </div>
          </section>

          {/* Order Items */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
                Order Items
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {cart.map(item => (
                <div key={item.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg bg-gray-50" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Placing Order / Price Breakdown */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Price Breakdown</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-semibold">{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm text-emerald-600">
                <span>Taxes & Fees</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="border-t border-gray-100 flex justify-between pt-4">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-extrabold text-xl text-gray-900">${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base shadow-emerald-500/20 shadow-lg disabled:opacity-75 disabled:cursor-wait"
            >
              {isPlacingOrder ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Order...
                </>
              ) : (
                'Place Order'
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              Encrypted and secure cart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutReview;
