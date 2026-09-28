import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, ArrowRight, CheckCircle2, Clock, MapPin, Truck, CloudCheck } from 'lucide-react';
import { ProductItem, BusinessLocation, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { saveOrderToFirestore } from '../lib/firebase';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { [id: string]: number };
  products: ProductItem[];
  location: BusinessLocation;
  currentLang: Language;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  products,
  location,
  currentLang,
  onUpdateQuantity,
  onClearCart
}) => {
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pickupSlot, setPickupSlot] = useState<string>('express-pickup');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('cod');

  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const itemsInCart = Object.entries(cartItems)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const prod = products.find(p => p.id === id);
      return { product: prod!, qty };
    })
    .filter(item => item.product !== undefined);

  const subtotal = itemsInCart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const deliveryFee = deliveryType === 'delivery' ? (subtotal >= location.freeDeliveryThreshold ? 0 : 60) : 0;
  const total = subtotal + deliveryFee;

  const getProductName = (p: ProductItem) => {
    if (currentLang === 'bn' && p.nameBn) return p.nameBn;
    if (currentLang === 'en' && p.nameEn) return p.nameEn;
    return p.name;
  };

  const getProductUnit = (p: ProductItem) => {
    if (currentLang === 'bn' && p.unitBn) return p.unitBn;
    if (currentLang === 'en' && p.unitEn) return p.unitEn;
    return p.unit;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await saveOrderToFirestore({
      customerName,
      customerPhone,
      customerAddress: deliveryType === 'delivery' ? customerAddress : undefined,
      items: itemsInCart.map(i => ({
        id: i.product.id,
        name: i.product.name,
        qty: i.qty,
        price: i.product.price
      })),
      subtotal,
      deliveryFee,
      total,
      deliveryType,
      pickupSlot,
      paymentMethod
    });

    setPlacedOrderId(result.orderId);
    setIsSubmitting(false);
    setOrderConfirmed(true);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderConfirmed(false);
    setPlacedOrderId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold font-display">{t.cart.title}</h2>
            </div>
            <button onClick={onClose} className="text-stone-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderConfirmed ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-700 mx-auto" />
                <h3 className="text-xl font-bold font-display text-stone-900">
                  {deliveryType === 'delivery' ? t.cart.confirmedTitleDelivery : t.cart.confirmedTitlePickup}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  {t.cart.confirmedMsg(customerName)}
                </p>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-left space-y-2">
                  {placedOrderId && (
                    <div className="flex justify-between items-center pb-1.5 border-b border-emerald-200/60 text-stone-600">
                      <span>Order Reference ID:</span>
                      <span className="font-mono font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-300">{placedOrderId}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-emerald-950">
                    <span>{t.cart.orderTotal}</span>
                    <span className="font-mono text-sm">৳{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{t.cart.paymentMethod}</span>
                    <span className="font-semibold uppercase">{paymentMethod === 'cod' ? t.cart.cod : t.cart.bkash}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{t.cart.orderType}</span>
                    <span>{deliveryType === 'delivery' ? t.cart.homeDelivery : `${t.cart.storePickup} (${location.street})`}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{t.cart.helpline}</span>
                    <span className="font-mono">{location.phone}</span>
                  </div>
                  <div className="pt-1.5 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-emerald-800">
                    <span>Firebase Firestore Status:</span>
                    <span className="font-medium text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">Synced to Cloud</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl"
                >
                  {t.cart.continueShopping}
                </button>
              </div>
            ) : itemsInCart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-base font-semibold text-stone-700">{t.cart.emptyTitle}</p>
                <p className="text-xs text-stone-500">{t.cart.emptyDesc}</p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-900 rounded-xl"
                >
                  {t.cart.browseHarvest}
                </button>
              </div>
            ) : (
              <>
                {/* Free Delivery Bar in ৳ */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                  {subtotal >= location.freeDeliveryThreshold ? (
                    <div className="text-emerald-800 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>{t.cart.freeDeliveryQualified}</span>
                    </div>
                  ) : (
                    <div>
                      <span>{t.cart.freeDeliveryRemaining(Math.round(location.freeDeliveryThreshold - subtotal))}</span>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div 
                          className="bg-emerald-700 h-full transition-all"
                          style={{ width: `${Math.min(100, (subtotal / location.freeDeliveryThreshold) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Mode Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      deliveryType === 'pickup' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.cart.storePickup}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      deliveryType === 'delivery' ? 'bg-white text-emerald-950 shadow-xs' : 'text-stone-600'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t.cart.homeDelivery}</span>
                  </button>
                </div>

                {/* Items List */}
                <div className="divide-y divide-stone-100">
                  {itemsInCart.map(({ product, qty }) => (
                    <div key={product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-semibold text-stone-900">{getProductName(product)}</h4>
                        <span className="text-stone-500 font-mono">৳{product.price.toFixed(0)} {getProductUnit(product)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-300 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(product.id, -1)}
                            className="p-1.5 hover:bg-stone-100 text-stone-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-mono tabular-nums font-semibold">{qty}</span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, 1)}
                            className="p-1.5 hover:bg-stone-100 text-stone-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono tabular-nums font-bold text-stone-900 w-14 text-right">
                          ৳{(product.price * qty).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pickup / Delivery Time Slot */}
                <div className="space-y-2 pt-2 border-t border-stone-200 text-xs">
                  <label className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{t.cart.selectSlot}</span>
                  </label>
                  <select
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800 text-xs"
                  >
                    <option value="express-pickup">{t.cart.slot1}</option>
                    <option value="same-day-afternoon">{t.cart.slot2}</option>
                    <option value="tomorrow-morning">{t.cart.slot3}</option>
                  </select>
                </div>

                {/* Customer Details Form */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">{t.cart.fullName}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Rahman"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">{t.cart.phone}</label>
                    <input
                      type="tel"
                      required
                      placeholder="01711-XXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800 font-mono"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">{t.cart.address}</label>
                      <textarea
                        rows={2}
                        required
                        placeholder="House / Flat No, Road No, Area (e.g. Dhanmondi / Banani / Uttara)..."
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                      ></textarea>
                    </div>
                  )}

                  {/* Payment Method Selection */}
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">{t.cart.paymentMethod}</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer ${paymentMethod === 'cod' ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-950' : 'border-stone-200'}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-emerald-700"
                        />
                        <span>{t.cart.cod}</span>
                      </label>
                      <label className={`p-2.5 rounded-lg border flex items-center gap-2 cursor-pointer ${paymentMethod === 'bkash' ? 'bg-emerald-50 border-emerald-500 font-semibold text-emerald-950' : 'border-stone-200'}`}>
                        <input
                          type="radio"
                          name="payment"
                          value="bkash"
                          checked={paymentMethod === 'bkash'}
                          onChange={() => setPaymentMethod('bkash')}
                          className="text-emerald-700"
                        />
                        <span>{t.cart.bkash}</span>
                      </label>
                    </div>
                  </div>

                  {/* Summary Math */}
                  <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>{t.cart.subtotal}</span>
                      <span className="font-mono tabular-nums text-stone-900">৳{subtotal.toFixed(0)}</span>
                    </div>
                    {deliveryType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>{t.cart.deliveryFee}</span>
                        <span className="font-mono tabular-nums text-stone-900">
                          {deliveryFee === 0 ? t.cart.free : `৳${deliveryFee}`}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-stone-100">
                      <span>{t.cart.total}</span>
                      <span className="font-mono tabular-nums text-emerald-950 font-bold">৳{total.toFixed(0)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    <span>{t.cart.confirmBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[11px] text-stone-500 text-center">
                    {t.cart.paymentGuarantee}
                  </p>
                </form>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
