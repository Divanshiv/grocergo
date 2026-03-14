import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  Tag,
  Truck,
  ShieldCheck,
} from "lucide-react";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, cartTotal, cartSavings, cartCount, clearCart } = useCart();

  const deliveryFee = cartTotal >= 35 ? 0 : 4.99;
  const orderTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any items yet. Explore our fresh
            collection and fill up your cart!
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {cartCount} item{cartCount !== 1 && "s"} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors text-sm font-medium"
        >
          <Trash2 className="w-4 h-4" />
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm font-medium mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({cartCount} items)
                </span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>

              {cartSavings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-600 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Savings
                  </span>
                  <span className="font-semibold text-emerald-600">
                    -${cartSavings.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-gray-600 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  Delivery
                </span>
                <span
                  className={`font-semibold ${
                    deliveryFee === 0 ? "text-emerald-600" : ""
                  }`}
                >
                  {deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>

              {deliveryFee > 0 && (
                <div className="bg-amber-50 rounded-xl p-3">
                  <p className="text-xs text-amber-700">
                    Add{" "}
                    <span className="font-bold">
                      ${(35 - cartTotal).toFixed(2)}
                    </span>{" "}
                    more for free delivery!
                  </p>
                  <div className="w-full bg-amber-200 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((cartTotal / 35) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-extrabold text-gray-900">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Link to="/checkout" className="btn-primary w-full text-center py-3.5 text-base block ring-1 ring-emerald-600 ring-offset-1">
              Proceed to Checkout
            </Link>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Truck className="w-4 h-4" />
                <span className="text-xs">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;