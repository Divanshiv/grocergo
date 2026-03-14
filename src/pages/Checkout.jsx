import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, User, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'card'
  });

  if (cartCount === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Move to review step, passing form data
    navigate('/checkout/review', { state: { checkoutData: formData } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/cart')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-sm text-gray-500">Step 1 of 2: Delivery & Payment Details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Info */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-lg font-bold text-gray-900">
            <User className="w-5 h-5 text-emerald-600" />
            Contact Information
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-lg font-bold text-gray-900">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Delivery Address
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input required type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-lg font-bold text-gray-900">
            <CreditCard className="w-5 h-5 text-emerald-600" />
            Payment Method
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className={`border-2 rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
              <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="text-emerald-600 w-4 h-4 focus:ring-emerald-500" />
              <div className="font-semibold text-gray-900">Credit/Debit Card</div>
            </label>
            <label className={`border-2 rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-colors ${formData.paymentMethod === 'paypal' ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'}`}>
              <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleInputChange} className="text-emerald-600 w-4 h-4 focus:ring-emerald-500" />
              <div className="font-semibold text-gray-900">PayPal</div>
            </label>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn-primary px-8 text-lg font-bold">
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
