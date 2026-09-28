import React, { useState, useEffect } from 'react';
import { X, Flame, CheckCircle2, AlertTriangle, RefreshCw, Copy, Check, ExternalLink, Send, Database } from 'lucide-react';
import { 
  testFirebaseConnection, 
  sendTestOrderToFirebase, 
  FIREBASE_APP_CONFIG, 
  FirebaseConnectionStatus 
} from '../lib/firebase';
import { Language } from '../types';

interface FirebaseStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const FirebaseStatusModal: React.FC<FirebaseStatusModalProps> = ({
  isOpen,
  onClose,
  currentLang
}) => {
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<FirebaseConnectionStatus | null>(null);
  const [sendingTestOrder, setSendingTestOrder] = useState(false);
  const [testOrderResult, setTestOrderResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedRules, setCopiedRules] = useState(false);

  const recommendedRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

  const runTest = async () => {
    setTesting(true);
    setTestOrderResult(null);
    try {
      const res = await testFirebaseConnection();
      setStatus(res);
    } catch (e: any) {
      setStatus({
        success: false,
        code: 'UNKNOWN',
        message: e?.message || 'Error testing connection'
      });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      runTest();
    }
  }, [isOpen]);

  const handleSendTestOrder = async () => {
    setSendingTestOrder(true);
    setTestOrderResult(null);
    const res = await sendTestOrderToFirebase();
    setSendingTestOrder(false);
    if (res.success) {
      setTestOrderResult({
        success: true,
        message: `সফল হয়েছে! টেস্ট অর্ডার আইডি: ${res.orderId}। আপনার Firebase Console-এর 'orders' কালেকশনে গিয়ে রিফ্রেশ করলেই এটি দেখতে পাবেন!`
      });
    } else {
      setTestOrderResult({
        success: false,
        message: `ব্যর্থ হয়েছে: ${res.error || 'Permission Denied'}`
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recommendedRules);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 2500);
  };

  if (!isOpen) return null;

  const isBn = currentLang === 'bn';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>{isBn ? 'ফায়ারবেস সংযোগ ও স্ট্যাটাস' : 'Firebase Connection & Diagnostics'}</span>
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                Project: {FIREBASE_APP_CONFIG.projectId}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">

          {/* Current Live Status Card */}
          <div className={`p-4 rounded-xl border ${
            testing 
              ? 'bg-stone-50 border-stone-200' 
              : status?.success
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : status?.code === 'PERMISSION_DENIED'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-start gap-3">
              {testing ? (
                <RefreshCw className="w-5 h-5 text-stone-600 animate-spin shrink-0 mt-0.5" />
              ) : status?.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-semibold text-sm flex items-center gap-2">
                  <span>
                    {testing 
                      ? 'সার্ভারে কানেকশন চেক করা হচ্ছে...' 
                      : status?.success 
                        ? 'সফলভাবে ক্লাউডে কানেক্টেড এবং প্রস্তুত!' 
                        : 'Google Firebase সার্ভার রেসপন্স করেছে'}
                  </span>
                  {status?.latencyMs !== undefined && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/80 border border-stone-200 text-stone-700">
                      {status.latencyMs}ms
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {status?.message}
                </p>
              </div>
            </div>
          </div>

          {/* If Permission Denied (Default Firebase state for fresh projects) */}
          {status?.code === 'PERMISSION_DENIED' && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>কেন 'Permission Denied' দেখাচ্ছে এবং কীভাবে ১ মিনিটে সমাধান করবেন:</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                আপনার দেওয়া Firebase প্রজেক্ট আইডি ও কী দিয়ে গুগল সার্ভারের সাথে সফলভাবে যোগাযোগ স্থাপিত হয়েছে। তবে নতুন Firebase প্রজেক্ট তৈরি করার পর গুগলের ডিফল্ট সিকিউরিটি রুলস ডাটা সেভ করা ব্লক করে রাখে। নিচে দেওয়া কোডটি আপনার Firebase Console-এ দিলেই ডাটা সরাসরি ক্লাউডে সেভ হওয়া শুরু হবে:
              </p>

              <ol className="text-xs text-stone-700 space-y-2 list-decimal list-inside bg-white p-3 rounded-lg border border-amber-200">
                <li>
                  <a 
                    href={`https://console.firebase.google.com/project/${FIREBASE_APP_CONFIG.projectId}/firestore/rules`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold underline"
                  >
                    <span>Firebase Rules Console লিংক খুলুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>সেখানে থাকা কোডটি মুছে নিচের কোডটি পেস্ট করুন:</li>
              </ol>

              {/* Rules Code Snippet */}
              <div className="relative">
                <pre className="bg-stone-900 text-amber-300 p-3 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-stone-800">
                  {recommendedRules}
                </pre>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-white rounded-md text-xs font-medium flex items-center gap-1 transition-colors border border-stone-700"
                >
                  {copiedRules ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRules ? 'কপি হয়েছে!' : 'কোড কপি করুন'}</span>
                </button>
              </div>

              <p className="text-xs text-stone-600">
                ৩. পেস্ট করার পর <strong>"Publish"</strong> বাটনে ক্লিক করুন। তারপর নিচের <strong>"আবার কানেকশন টেস্ট করুন"</strong> বাটনে চাপুন!
              </p>
            </div>
          )}

          {/* If Connected successfully */}
          {status?.success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-2">
              <p className="font-semibold flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>সবকিছু সম্পূর্ণ প্রস্তুত!</span>
              </p>
              <p>
                এখন ওয়েবসাইট থেকে কাস্টমার যে কোনো অর্ডার বা বার্তা পাঠালে তা সরাসরি আপনার ক্লাউড ডাটাবেসের <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono text-emerald-950 font-bold">orders</code> ও <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono text-emerald-950 font-bold">inquiries</code> কালেকশনে জমা হবে।
              </p>
            </div>
          )}

          {/* Test Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={runTest}
              disabled={testing}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'চেক হচ্ছে...' : 'আবার কানেকশন টেস্ট করুন'}</span>
            </button>

            <button
              onClick={handleSendTestOrder}
              disabled={sendingTestOrder}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${sendingTestOrder ? 'animate-pulse' : ''}`} />
              <span>{sendingTestOrder ? 'পাঠানো হচ্ছে...' : 'লাইভ টেস্ট অর্ডার পাঠান'}</span>
            </button>
          </div>

          {/* Test Order Feedback */}
          {testOrderResult && (
            <div className={`p-3 rounded-lg text-xs border ${
              testOrderResult.success 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                : 'bg-rose-50 text-rose-900 border-rose-200'
            }`}>
              {testOrderResult.message}
            </div>
          )}

          {/* Config Details */}
          <div className="pt-2 border-t border-stone-200">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-stone-500" />
              <span>যুক্ত ফায়ারবেস কনফিগারেশন বিবরণী:</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-stone-50 p-2.5 rounded-lg text-stone-600">
              <div><strong>Project:</strong> {FIREBASE_APP_CONFIG.projectId}</div>
              <div><strong>Auth Domain:</strong> {FIREBASE_APP_CONFIG.authDomain}</div>
              <div><strong>Storage:</strong> {FIREBASE_APP_CONFIG.storageBucket}</div>
              <div><strong>App ID:</strong> {FIREBASE_APP_CONFIG.appId}</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center text-xs">
          <a
            href={`https://console.firebase.google.com/project/${FIREBASE_APP_CONFIG.projectId}/firestore`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
          >
            <span>Firebase Console খুলুন</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold transition-colors"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
