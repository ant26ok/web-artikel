import type { FC } from 'hono/jsx';
import type { Article } from './db';

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'Hospital IT':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Pemrograman':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'Standar Medis':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    default:
      return 'bg-purple-50 text-purple-700 border-purple-200';
  }
};

export const Layout: FC<{ title?: string; children: any; isDetail?: boolean; activeTab?: string }> = ({ 
  title = 'KabarTekno — Catatan & Artikel IT', 
  children,
  isDetail = false,
  activeTab = 'home'
}) => {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <title>{title}</title>
        
        <script src="https://cdn.tailwindcss.com?plugins=typography,forms,aspect-ratio"></script>
        <script>{`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  brand: {
                    50: '#eef2ff',
                    100: '#e0e7ff',
                    500: '#6366f1',
                    600: '#4f46e5',
                    700: '#4338ca',
                    900: '#1e1b4b',
                  }
                },
                fontFamily: {
                  sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
                }
              }
            }
          }
        `}</script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <style>{`
          body { 
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            -webkit-tap-highlight-color: transparent;
          }
          pre, code { font-family: 'JetBrains Mono', monospace; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .safe-pb {
            padding-bottom: calc(env(safe-area-inset-bottom, 12px) + 8px);
          }
        `}</style>
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        {isDetail && (
          <div id="read-progress" className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-600 z-50 transition-all duration-150 w-0"></div>
        )}

        {/* Top Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2.5 active:scale-95 transition">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-sm sm:text-base shadow-sm shadow-indigo-600/30">
                KT
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  KabarTekno
                </span>
                <span className="text-[10px] text-slate-500 font-medium block -mt-0.5 sm:mt-0">
                  IT Rumah Sakit & Koding
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-2">
              <a
                href="/"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeTab === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                Beranda
              </a>
              <a
                href="/new"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-sm shadow-indigo-600/25 transition flex items-center space-x-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>Tulis Artikel</span>
              </a>
            </nav>

            {/* Mobile Header Quick Actions */}
            <div className="sm:hidden flex items-center space-x-2">
              <a
                href="/new"
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center space-x-1 active:scale-95 transition shadow-xs"
              >
                <span>+</span>
                <span>Tulis</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area: pb-28 on mobile ensures bottom nav never covers content */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-8 pb-28 sm:pb-12">
          {children}
        </main>

        {/* Desktop Footer */}
        <footer className="hidden sm:block bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto px-4 flex flex-row items-center justify-between">
            <span>© 2026 KabarTekno — Bun + Hono + SQLite</span>
            <div className="flex space-x-4">
              <a href="/api/articles" className="hover:text-indigo-600 transition">REST API</a>
              <a href="https://github.com/ant26ok/web-artikel" target="_blank" className="hover:text-indigo-600 transition">GitHub</a>
            </div>
          </div>
        </footer>

        {/* Mobile App-Style Bottom Navigation Bar */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 px-4 py-2 flex items-center justify-around z-40 shadow-lg safe-pb">
          <a
            href="/"
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${activeTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px]">Beranda</span>
          </a>

          <a
            href="/new"
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition ${activeTab === 'new' ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}
          >
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center -mt-5 shadow-md shadow-indigo-600/30 active:scale-90 transition">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[10px] text-indigo-600 font-bold mt-0.5">Tulis</span>
          </a>

          <a
            href="/api/articles"
            className="flex flex-col items-center py-1 px-3 rounded-xl text-slate-500 font-medium transition"
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-[10px]">API</span>
          </a>
        </nav>

        {isDetail && (
          <script>{`
            window.addEventListener('scroll', () => {
              const winScroll = document.documentElement.scrollTop;
              const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (winScroll / height) * 100;
              const bar = document.getElementById('read-progress');
              if (bar) bar.style.width = scrolled + '%';
            });
          `}</script>
        )}
      </body>
    </html>
  );
};

export const ArticleList: FC<{
  articles: Article[];
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
}> = ({ articles, categories, selectedCategory, searchQuery }) => {
  const featured = articles[0];
  const regularArticles = articles.slice(1);

  return (
    <Layout title="KabarTekno — Catatan & Artikel IT" activeTab="home">
      {/* Mobile-Friendly Hero Section */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-8 mb-5 shadow-md shadow-slate-900/10">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[11px] font-semibold mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hospital IT & Software Engineering</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white mb-2">
            Catatan Teknologi & Sistem Rumah Sakit
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 max-w-xl">
            Solusi integrasi data rekam medis, otomasi n8n, SNOMED CT, dan arsitektur backend.
          </p>

          {/* Search Input (16px font prevents iOS auto-zoom) */}
          <form method="GET" action="/" className="relative flex items-center">
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="q"
              placeholder="Cari artikel (misal: SIMRS, SNOMED)..."
              value={searchQuery}
              className="w-full pl-9 pr-20 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition"
            />
            {selectedCategory !== 'Semua' && (
              <input type="hidden" name="cat" value={selectedCategory} />
            )}
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* Horizontal Scrollable Category Filter for Mobile */}
      <section className="mb-5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pilih Topik</span>
          {(searchQuery || selectedCategory !== 'Semua') && (
            <a
              href="/"
              className="text-[11px] text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition"
            >
              ✕ Reset
            </a>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((c) => {
            const isSelected = (c === selectedCategory) || (!selectedCategory && c === 'Semua');
            const link = c === 'Semua'
              ? (searchQuery ? `/?q=${encodeURIComponent(searchQuery)}` : '/')
              : (searchQuery ? `/?cat=${encodeURIComponent(c)}&q=${encodeURIComponent(searchQuery)}` : `/?cat=${encodeURIComponent(c)}`);

            return (
              <a
                key={c}
                href={link}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 border shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured / Latest Article (Hero Card) */}
      {!searchQuery && selectedCategory === 'Semua' && featured && (
        <section className="mb-5">
          <a
            href={`/article/${featured.slug}`}
            className="block bg-gradient-to-br from-indigo-50/90 via-purple-50/50 to-white rounded-2xl p-4 sm:p-6 border border-indigo-100/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition active:scale-[0.99] group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                Terbaru
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getCategoryColor(featured.category)}`}>
                {featured.category}
              </span>
              <span className="text-[11px] text-slate-400 ml-auto font-medium">
                {featured.read_time} mnt
              </span>
            </div>

            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-2">
              {featured.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 sm:line-clamp-3 leading-relaxed mb-3">
              {featured.excerpt}
            </p>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-indigo-100/70 text-slate-500 font-medium">
              <span>Oleh <strong className="text-slate-800">{featured.author}</strong></span>
              <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition">
                Baca Artikel →
              </span>
            </div>
          </a>
        </section>
      )}

      {/* Articles List / Grid */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {searchQuery ? `Hasil Pencarian` : 'Daftar Artikel'}
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            {articles.length} tulisan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {(!searchQuery && selectedCategory === 'Semua' ? regularArticles : articles).map((item) => (
            <a
              key={item.id}
              href={`/article/${item.slug}`}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-indigo-300 transition active:scale-[0.99] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-slate-400 text-[11px] font-medium">
                    {item.read_time} mnt baca
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{item.author}</span>
                <span className="font-bold text-indigo-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  Baca →
                </span>
              </div>
            </a>
          ))}

          {articles.length === 0 && (
            <div className="col-span-full py-14 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-600 font-bold text-sm">Tidak ada artikel yang cocok</p>
              <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian yang lain.</p>
              <a
                href="/"
                className="mt-3.5 inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Lihat Semua Artikel
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const ArticleDetail: FC<{ article: Article }> = ({ article }) => {
  const paragraphs = article.content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <Layout title={`${article.title} — KabarTekno`} isDetail={true} activeTab="detail">
      <div className="max-w-2xl mx-auto">
        {/* Top Back Button with comfortable 44px touch target */}
        <div className="mb-3">
          <a
            href="/"
            className="inline-flex items-center text-xs font-bold text-slate-600 hover:text-indigo-600 transition py-2 pr-3 gap-1.5 active:scale-95"
          >
            <span className="text-base leading-none">←</span>
            <span>Kembali ke Beranda</span>
          </a>
        </div>

        {/* Article Header Card */}
        <header className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <span className="text-[11px] text-slate-400">•</span>
            <span className="text-[11px] text-slate-500 font-medium">{article.read_time} menit membaca</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug sm:leading-tight mb-3">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block leading-tight">{article.author}</span>
                <span className="text-[10px] text-slate-400">{article.created_at}</span>
              </div>
            </div>

            {/* Mobile Share & Delete Buttons */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                className="px-3 py-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition flex items-center gap-1 active:scale-95"
                onclick={`
                  if (navigator.share) {
                    navigator.share({
                      title: ${JSON.stringify(article.title)},
                      text: ${JSON.stringify(article.excerpt)},
                      url: window.location.href
                    }).catch(()=>{});
                  } else {
                    const waUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(${JSON.stringify(article.title)} + '\\n' + window.location.href);
                    window.open(waUrl, '_blank');
                  }
                `}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Bagikan</span>
              </button>

              <form
                method="POST"
                action={`/api/articles/${article.id}/delete`}
                onsubmit="return confirm('Hapus artikel ini?');"
              >
                <button
                  type="submit"
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  title="Hapus"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Article Reading Content (Mobile-optimized typography) */}
        <div className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-200/90 shadow-xs">
          <div className="text-[16px] sm:text-[17px] text-slate-700 leading-[1.75] space-y-4">
            {paragraphs.map((p, idx) => {
              const trimmed = p.trim();

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-black text-slate-900 pt-4 pb-1 border-b border-slate-100">
                    {trimmed.replace(/^###\s+/, '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('- ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="space-y-2 my-3 pl-0">
                    {lines.map((l, liIdx) => (
                      <li key={liIdx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                        <span className="text-sm sm:text-base">{l.replace(/^[-\*]\s+/, '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (/^\d+\.\s/.test(trimmed)) {
                const lines = trimmed.split('\n');
                return (
                  <ol key={idx} className="space-y-2 my-3 pl-0">
                    {lines.map((l, liIdx) => {
                      const match = l.match(/^(\d+)\.\s*(.*)/);
                      const num = match ? match[1] : String(liIdx + 1);
                      const text = match ? match[2] : l;
                      return (
                        <li key={liIdx} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {num}
                          </span>
                          <span className="text-sm sm:text-base">{text}</span>
                        </li>
                      );
                    })}
                  </ol>
                );
              }

              return <p key={idx}>{trimmed}</p>;
            })}
          </div>

          {/* Author Box */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm shrink-0">
              {article.author.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 block">{article.author}</span>
              <span className="text-[11px] text-slate-500 block">Full-stack Programmer & Sistem Analis</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Action: Share to WhatsApp Button on mobile */}
        <div className="mt-5 flex gap-2.5">
          <a
            href="/"
            className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 text-center shadow-xs active:scale-95 transition"
          >
            ← Kembali
          </a>
          <button
            type="button"
            className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
            onclick={`
              const waUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(${JSON.stringify(article.title)} + '\\n' + window.location.href);
              window.open(waUrl, '_blank');
            `}
          >
            <span>Kirim ke WhatsApp 💬</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const CreateArticleForm: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <Layout title="Tulis Artikel Baru — KabarTekno" activeTab="new">
      <div className="max-w-xl mx-auto bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="mb-4">
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            Tulis Artikel Baru
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tulis catatan sistem, tips teknis, atau pengalaman di lapangan.
          </p>
        </div>

        <form method="POST" action="/articles" className="space-y-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Judul Artikel *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Contoh: Mengatasi Masalah Switch Overheat..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Kategori *</label>
              <input
                type="text"
                name="category"
                required
                defaultValue="Hospital IT"
                placeholder="Hospital IT / Pemrograman"
                list="category-options"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              <datalist id="category-options">
                {categories.filter(c => c !== 'Semua').map(c => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 text-xs sm:text-sm">Nama Penulis</label>
              <input
                type="text"
                name="author"
                defaultValue="Antok"
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-slate-700 text-xs sm:text-sm">Isi Konten *</label>
              <span className="text-[10px] text-slate-400">### untuk judul sub-bagian</span>
            </div>
            <textarea
              name="content"
              required
              rows={9}
              placeholder="Tuliskan isi artikel Anda di sini..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition leading-relaxed font-sans"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <a
              href="/"
              className="flex-1 py-3 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              Batal
            </a>
            <button
              type="submit"
              className="flex-2 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition"
            >
              Terbitkan Sekarang 🚀
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
