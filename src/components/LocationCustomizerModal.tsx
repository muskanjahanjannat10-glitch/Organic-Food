import React, { useState } from 'react';
import { MapPin, Check, SlidersHorizontal, Sparkles } from 'lucide-react';
import { BusinessLocation } from '../types';
import { LOCATION_PRESETS } from '../data/storeData';

interface LocationCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: BusinessLocation;
  onUpdateLocation: (loc: BusinessLocation) => void;
}

export const LocationCustomizerModal: React.FC<LocationCustomizerModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onUpdateLocation
}) => {
  const [formData, setFormData] = useState<BusinessLocation>(currentLocation);

  if (!isOpen) return null;

  const handleSelectPreset = (key: string) => {
    const preset = LOCATION_PRESETS[key];
    if (preset) {
      setFormData(preset);
      onUpdateLocation(preset);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLocation(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-stone-200">
        
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-display">Target Location Settings (শহর ও ঠিকানা)</h3>
              <p className="text-xs text-stone-500">Switch city or customize NAP for localized Google search ranking</p>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900 font-bold p-1">
            ✕
          </button>
        </div>

        {/* Quick Presets for Bangladesh */}
        <div className="mt-4 mb-6">
          <label className="block text-xs font-semibold uppercase text-stone-500 mb-2">
            Bangladeshi City Presets (বাংলাদেশী শহরসমূহ)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(LOCATION_PRESETS).map(([key, loc]) => {
              const isSelected = currentLocation.city.toLowerCase() === loc.city.toLowerCase();
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectPreset(key)}
                  className={`p-2.5 text-xs rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                      : 'bg-stone-50 text-stone-800 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <strong className="block truncate">{loc.city}</strong>
                  <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-stone-500'}`}>{loc.state}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-stone-700">
          <div>
            <label className="block font-medium text-stone-800 mb-1">Business Name (দোকানের নাম)</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block font-medium text-stone-800 mb-1">Street Address (রাস্তা ও এলাকা)</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-800 mb-1">Postal Code (কোড)</label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-800 mb-1">Target City (শহর)</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-800 mb-1">Division / State (বিভাগ)</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-stone-800 mb-1">Phone Number (মোবাইল নম্বর)</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-stone-800 mb-1">Contact Email (ইমেইল)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg font-semibold"
            >
              Apply Local SEO Target (প্রয়োগ করুন)
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
