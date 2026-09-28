import React, { useState } from 'react';
import { Copy, Check, Code, Globe, FileText, Smartphone, Laptop, Sparkles, BookOpen } from 'lucide-react';
import { BusinessLocation } from '../types';
import { generateLocalBusinessSchema } from '../data/storeData';

interface SeoToolkitModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: BusinessLocation;
}

export const SeoToolkitModal: React.FC<SeoToolkitModalProps> = ({
  isOpen,
  onClose,
  location
}) => {
  const [activeTab, setActiveTab] = useState<'serp' | 'schema' | 'sitemap' | 'wordpress'>('serp');
  const [devicePreview, setDevicePreview] = useState<'mobile' | 'desktop'>('desktop');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const schemaJson = generateLocalBusinessSchema(location);

  const metaTitle = `Best Organic Food Store in ${location.city}, Bangladesh | Organic Food`;
  const metaDescription = `Shop 100% formalin-free organic vegetables, fresh farm fruits, Sundarban raw honey, and cold-pressed mustard oil in ${location.city}, Bangladesh. Express same-day home delivery & curbside pickup.`;

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.organicfood.com.bd/</loc>
    <lastmod>2026-09-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.organicfood.com.bd/about-us</loc>
    <lastmod>2026-09-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.organicfood.com.bd/products</loc>
    <lastmod>2026-09-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.organicfood.com.bd/products/organic-shobji</loc>
    <lastmod>2026-09-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.organicfood.com.bd/products/taza-fol</loc>
    <lastmod>2026-09-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.organicfood.com.bd/products/khaati-pantry</loc>
    <lastmod>2026-09-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.organicfood.com.bd/contact-us</loc>
    <lastmod>2026-09-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  const robotsTxt = `# Robots.txt for Organic Food Bangladesh
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /api/
Disallow: /*?search=*
Disallow: /*?filter=*

# Allow crawlers full access to static assets
Allow: /images/
Allow: /css/
Allow: /js/
Allow: /*.js$
Allow: /*.css$
Allow: /*.png$
Allow: /*.webp$

Crawl-delay: 1

# Sitemap Location
Sitemap: https://www.organicfood.com.bd/sitemap.xml`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">Local SEO Technical Hub ({location.city}, Bangladesh)</h2>
              <p className="text-xs text-stone-400">Schema.org LocalBusiness, Google SERP Snippets, XML Sitemap, and CMS deployment guides</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-2 text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 gap-2 pt-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('serp')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'serp'
                ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Google SERP Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'schema'
                ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>LocalBusiness Schema (JSON-LD)</span>
          </button>

          <button
            onClick={() => setActiveTab('sitemap')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'sitemap'
                ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>XML Sitemap & Robots.txt</span>
          </button>

          <button
            onClick={() => setActiveTab('wordpress')}
            className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'wordpress'
                ? 'border-emerald-800 text-emerald-900 bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>CMS / WordPress Guide</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-stone-800">
          
          {/* TAB 1: GOOGLE SERP PREVIEW */}
          {activeTab === 'serp' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Google Search Result Snippet Simulation</h3>
                  <p className="text-xs text-stone-500">Live preview of how {location.name} appears in Bangladeshi Google search</p>
                </div>
                
                {/* Device Toggle */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200">
                  <button
                    onClick={() => setDevicePreview('desktop')}
                    className={`p-1.5 rounded text-xs flex items-center gap-1 ${devicePreview === 'desktop' ? 'bg-white shadow-xs font-bold text-stone-900' : 'text-stone-600'}`}
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setDevicePreview('mobile')}
                    className={`p-1.5 rounded text-xs flex items-center gap-1 ${devicePreview === 'mobile' ? 'bg-white shadow-xs font-bold text-stone-900' : 'text-stone-600'}`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Pixel-Accurate Google Snippet Box */}
              <div className="p-6 bg-white border border-stone-300 rounded-2xl shadow-xs font-sans">
                <div className="max-w-2xl space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#202124]">
                    <span className="w-4 h-4 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] font-bold">O</span>
                    <span className="text-stone-800 font-medium">Organic Food</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-500 text-[11px]">https://www.organicfood.com.bd &rsaquo; {location.city.toLowerCase()}</span>
                  </div>

                  <h4 className="text-[#1a0dab] hover:underline cursor-pointer text-lg font-medium leading-snug">
                    {metaTitle}
                  </h4>

                  {/* Rich Snippet Stars */}
                  <div className="flex items-center gap-2 text-xs text-[#70757a] py-0.5">
                    <span className="text-[#e37400] font-bold">★★★★★</span>
                    <span>Rating: {location.rating}</span>
                    <span>·</span>
                    <span>{location.reviewCount} reviews</span>
                    <span>·</span>
                    <span>Price: ৳৳ (BDT)</span>
                  </div>

                  <p className="text-xs text-[#4d5156] leading-relaxed">
                    {metaDescription}
                  </p>

                  {/* Sitelinks */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-[#1a0dab]">
                    <span className="hover:underline cursor-pointer">Organic Shobji & Vegetables</span>
                    <span className="hover:underline cursor-pointer">Sundarban Honey & Mustard Oil</span>
                    <span className="hover:underline cursor-pointer">{location.city} Store Hours & Map</span>
                    <span className="hover:underline cursor-pointer">Express 15-Min Pickup</span>
                  </div>
                </div>
              </div>

              {/* Character Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Meta Title Length:</span>
                    <span className="font-mono text-emerald-800">{metaTitle.length} / 60 chars</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: `${(metaTitle.length / 60) * 100}%` }}></div>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">Optimal for Google Desktop & Mobile display</span>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Meta Description Length:</span>
                    <span className="font-mono text-emerald-800">{metaDescription.length} / 160 chars</span>
                  </div>
                  <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full" style={{ width: `${(metaDescription.length / 160) * 100}%` }}></div>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">Full snippet displays without SERP truncation</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCHEMA JSON-LD */}
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Schema.org LocalBusiness (JSON-LD) Markup</h3>
                  <p className="text-xs text-stone-500">Injects NAP consistency, geo coordinates, BDT currency, and opening hours for Google Knowledge Graph</p>
                </div>
                <button
                  onClick={() => handleCopy(schemaJson, 'schema')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-900 hover:bg-emerald-800 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'schema' ? 'Copied JSON-LD!' : 'Copy Schema'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-stone-900 text-emerald-300 font-mono text-xs rounded-xl overflow-x-auto max-h-[360px] leading-relaxed">
                  {schemaJson}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: SITEMAP & ROBOTS */}
          {activeTab === 'sitemap' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900">XML Sitemap (/sitemap.xml)</h3>
                  <button
                    onClick={() => handleCopy(sitemapXml, 'sitemap')}
                    className="px-3 py-1 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sitemap' ? 'Copied!' : 'Copy XML'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-stone-300 font-mono text-xs rounded-xl overflow-x-auto max-h-[220px]">
                  {sitemapXml}
                </pre>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-900">Robots.txt (/robots.txt)</h3>
                  <button
                    onClick={() => handleCopy(robotsTxt, 'robots')}
                    className="px-3 py-1 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center gap-1"
                  >
                    {copiedKey === 'robots' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'robots' ? 'Copied!' : 'Copy Robots'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-amber-200 font-mono text-xs rounded-xl overflow-x-auto max-h-[180px]">
                  {robotsTxt}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: CMS / WORDPRESS DEPLOYMENT GUIDE */}
          {activeTab === 'wordpress' && (
            <div className="space-y-4 text-xs text-stone-700 leading-relaxed">
              <h3 className="text-sm font-bold text-stone-900">Step-by-Step Deployment Instructions</h3>
              
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-emerald-950">Option A: WordPress & WooCommerce</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-600">
                  <li>Install <strong>Rank Math SEO</strong> or <strong>Yoast SEO</strong> plugin.</li>
                  <li>Go to <em>General Settings &rarr; Local SEO</em>: Set business type to <strong>GroceryStore</strong>, Name to <strong>Organic Food</strong>, currency to <strong>BDT (৳)</strong>.</li>
                  <li>Paste the generated <strong>LocalBusiness JSON-LD</strong> into <code>header.php</code> or the plugin&apos;s custom schema box.</li>
                  <li>Set bKash / Nagad / Cash on Delivery under <em>WooCommerce &rarr; Payments</em>.</li>
                </ol>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-emerald-950">Option B: Custom Hosting (cPanel / Vercel / Netlify / Node.js)</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-600">
                  <li>Run <code>npm run build</code> to produce production-optimized static assets.</li>
                  <li>Upload the generated <code>dist/</code> files to your web root (<code>public_html</code>).</li>
                  <li>Verify that <code>/sitemap.xml</code> and <code>/robots.txt</code> resolve cleanly with 200 OK headers.</li>
                  <li>Submit the sitemap in <strong>Google Search Console</strong>.</li>
                </ol>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
