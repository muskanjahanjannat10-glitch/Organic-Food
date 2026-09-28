import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, AlertCircle, Truck } from 'lucide-react';
import { BusinessLocation, Language } from '../types';
import { STORE_HOURS_BN, STORE_HOURS_EN, DEFAULT_DELIVERY_ZONES } from '../data/storeData';
import { TRANSLATIONS } from '../data/translations';
import { saveInquiryToFirestore } from '../lib/firebase';

interface ContactSectionProps {
  location: BusinessLocation;
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ location, currentLang }) => {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiryType: 'pickup_order',
    notes: ''
  });

  const [zipCheck, setZipCheck] = useState<string>('');
  const [zipResult, setZipResult] = useState<{ eligible: boolean; zone?: string; minOrder?: number } | null>(null);

  const t = TRANSLATIONS[currentLang];
  const hoursList = currentLang === 'bn' ? STORE_HOURS_BN : STORE_HOURS_EN;

  // Check if store is currently open based on local time
  const isCurrentlyOpen = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeMinutes = hours * 60 + minutes;

    // Standard hours 7:30 AM (450 mins) to 9:00 PM (1260 mins)
    return currentTimeMinutes >= 7 * 60 + 30 && currentTimeMinutes <= 21 * 60;
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipCheck.trim();
    const matchedZone = DEFAULT_DELIVERY_ZONES.find(z => z.zip === cleanZip);
    if (matchedZone || cleanZip === location.zip) {
      setZipResult({
        eligible: true,
        zone: matchedZone ? matchedZone.neighborhood : `${location.city} Central Zone`,
        minOrder: matchedZone ? matchedZone.minOrder : location.freeDeliveryThreshold
      });
    } else if (cleanZip.length >= 4) {
      setZipResult({ eligible: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveInquiryToFirestore(formData);
    setFormSubmitted(true);
  };

  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${location.street}, ${location.city}, Bangladesh`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${location.street}, ${location.city}, Bangladesh`
  )}`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#f8f7f2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.contact.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display text-balance">
            {t.contact.heading} ({location.city})
          </h2>
          <p className="mt-2 text-base text-stone-600">
            {t.contact.desc}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): NAP, Operating Hours & Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* NAP Consistency Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 font-display mb-4 flex items-center justify-between">
                <span>{t.contact.napTitle}</span>
                <span className="text-xs text-emerald-800 font-medium font-sans">100% NAP Consistency</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-semibold block uppercase">{t.contact.addressLabel}</span>
                    <strong className="text-stone-900 font-medium block">{location.name}</strong>
                    <span className="text-stone-700">{location.street}</span>
                    <span className="block text-stone-700">{location.city}, {location.state} {location.zip}, Bangladesh</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-semibold block uppercase">{t.contact.phoneLabel}</span>
                    <a href={`tel:${location.phone}`} className="text-emerald-900 font-bold hover:underline font-mono">
                      {location.phone}
                    </a>
                    <span className="block text-stone-500 text-xs mt-0.5">Helpline: 8 AM - 10 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-semibold block uppercase">{t.contact.emailLabel}</span>
                    <a href={`mailto:${location.email}`} className="text-emerald-900 font-semibold hover:underline">
                      {location.email}
                    </a>
                    <span className="block text-stone-500 text-xs mt-0.5">Replies within 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 font-semibold block uppercase">{t.contact.statusLabel}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2 h-2 rounded-full ${isCurrentlyOpen() ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                      <span className="font-semibold text-stone-900">
                        {isCurrentlyOpen() ? t.contact.openNow : t.contact.closedNow}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.contact.directionsBtn}</span>
                </a>
                <a
                  href={`tel:${location.phone}`}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{t.contact.callBtn}</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-display">
                    {t.contact.hoursTitle}
                  </h3>
                  <span className="text-xs text-stone-500">Same-Day Pickup & Delivery: 8:00 AM – 8:30 PM</span>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {t.contact.openDaily}
                </span>
              </div>

              <div className="divide-y divide-stone-100 text-xs">
                {hoursList.map((h, index) => {
                  const todayIndex = new Date().getDay(); // 0 is Sun, 6 is Sat
                  // In Bangladesh Saturday is start of week
                  const isToday = currentLang === 'bn'
                    ? (todayIndex === 6 && index === 0) || (todayIndex === 0 && index === 1) || (todayIndex === index - 1)
                    : h.day.toLowerCase().includes(new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());

                  return (
                    <div
                      key={h.day}
                      className={`py-2 flex items-center justify-between ${
                        isToday ? 'font-semibold text-emerald-950 bg-emerald-50/70 px-2 rounded-md' : 'text-stone-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {h.day}
                        {isToday && <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">{t.contact.todayBadge}</span>}
                      </span>
                      <span className="font-mono tabular-nums">{h.open} – {h.close}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Local Delivery Postal Code Checker */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-display font-bold text-base">
                <Truck className="w-4 h-4 text-emerald-800" />
                <span>{t.contact.checkDelivery}</span>
              </div>
              <p className="text-xs text-stone-600">
                {t.contact.checkDeliveryDesc}
              </p>

              <form onSubmit={handleZipCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={5}
                  value={zipCheck}
                  onChange={(e) => setZipCheck(e.target.value.replace(/\D/g, ''))}
                  placeholder={`e.g. ${location.zip}`}
                  className="px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800 font-mono w-64"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-emerald-900 rounded-lg transition-colors"
                >
                  {t.contact.verifyBtn}
                </button>
              </form>

              {zipResult && (
                <div className={`p-3 rounded-lg text-xs ${zipResult.eligible ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}>
                  {zipResult.eligible ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{t.contact.eligibleSuccess(zipResult.zone || '', zipResult.minOrder || 0)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{t.contact.eligibleSpecial}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
              <h3 className="text-lg font-bold text-stone-900 font-display mb-1">
                {t.contact.inquiryTitle}
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                {t.contact.inquiryDesc}
              </p>

              {formSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-950 font-display">{t.contact.inquiryReceived}</h4>
                  <p className="text-xs text-emerald-800">
                    {t.contact.inquiryThank(formData.fullName)}
                  </p>
                  <button
                    onClick={() => { setFormSubmitted(false); setFormData({ fullName: '', phone: '', email: '', inquiryType: 'pickup_order', notes: '' }); }}
                    className="mt-3 text-xs font-semibold text-emerald-900 underline"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">{t.contact.fullNameLabel}</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Tanvir Rahman"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">{t.contact.phoneLabelForm}</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="01711-XXXXXX"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">{t.contact.emailLabelForm}</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@gmail.com"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">{t.contact.inquiryTypeLabel}</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                      >
                        <option value="pickup_order">{t.contact.typePickup}</option>
                        <option value="weekly_csa_box">{t.contact.typeHarvestBox}</option>
                        <option value="specialty_item">{t.contact.typeSpecialty}</option>
                        <option value="local_grower">{t.contact.typeGrower}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">{t.contact.msgLabel}</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={t.contact.msgPlaceholder}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.contact.submitInquiry}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Right Column: Google Maps & Curbside info */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-display">{t.contact.mapsTitle}</h3>
                  <p className="text-[11px] text-stone-500">{t.contact.liveNav}</p>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.contact.openApp}</span>
                </a>
              </div>

              {/* Responsive Iframe Container */}
              <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <iframe
                  title={`Google Maps Location for ${location.name} in ${location.city}`}
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full filter saturate-95 contrast-105"
                ></iframe>
              </div>

              <div className="mt-3 p-3 bg-stone-50 rounded-xl text-xs text-stone-600 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-900 block">{location.name}</span>
                  <span>{location.street}, {location.city}, Bangladesh</span>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-800 font-bold hover:underline shrink-0 ml-2"
                >
                  {t.contact.viewRoute}
                </a>
              </div>
            </div>

            {/* Parking & Pickup Instructions */}
            <div className="bg-emerald-950 text-white p-6 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold font-display text-emerald-200">
                {t.contact.curbsideTitle}
              </h4>
              <ul className="text-xs text-stone-300 space-y-2 list-disc list-inside">
                <li>{t.contact.curbsideStep1}</li>
                <li>{t.contact.curbsideStep2}</li>
                <li>{t.contact.curbsideStep3}</li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
