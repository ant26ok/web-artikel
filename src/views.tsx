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
            padding-bottom: calc(env(safe-area-inset-bottom, 8px) + 4px);
          }
        `}</style>
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white text-xs sm:text-sm">
        {isDetail && (
          <div id="read-progress" className="fixed top-0 left-0 h-0.5 bg-indigo-600 z-50 transition-all duration-150 w-0"></div>
        )}

        {/* Compact Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
          <div className="max-w-4xl mx-auto px-3 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2 active:scale-95 transition">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                KT
              </div>
              <div className="flex items-baseline space-x-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 leading-none">
                  KabarTekno
                </span>
                <span className="hidden xs:inline text-[9px] text-slate-400 font-medium">
                  IT & Koding
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-2">
              <a
                href="/"
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'home' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                Beranda
              </a>
              <a
                href="/new"
                className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white transition flex items-center space-x-1 shadow-xs"
              >
                <span>+</span>
                <span>Tulis Artikel</span>
              </a>
            </nav>

            {/* Mobile Header Quick Action */}
            <div className="sm:hidden flex items-center space-x-1.5">
              <a
                href="/new"
                className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold flex items-center space-x-1 active:scale-95 transition"
              >
                <span>+</span>
                <span>Tulis</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content Area: Compact padding */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-3 sm:py-6 pb-20 sm:pb-10">
          {children}
        </main>

        {/* Desktop Footer */}
        <footer className="hidden sm:block bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
          <div className="max-w-4xl mx-auto px-4 flex flex-row items-center justify-between">
            <span>KabarTekno — Bun + Hono + SQLite</span>
            <div className="flex space-x-3 text-[11px]">
              <a href="/api/articles" className="hover:text-indigo-600 transition">REST API</a>
              <a href="https://github.com/ant26ok/web-artikel" target="_blank" className="hover:text-indigo-600 transition">GitHub</a>
            </div>
          </div>
        </footer>

        {/* Compact Mobile Bottom Navigation */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-1.5 flex items-center justify-around z-40 safe-pb shadow-sm">
          <a
            href="/"
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition ${activeTab === 'home' ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}
          >
            <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[9px]">Beranda</span>
          </a>

          <a
            href="/new"
            className={`flex flex-col items-center py-1 px-3 rounded-lg transition ${activeTab === 'new' ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}
          >
            <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-[9px]">Tulis</span>
          </a>

          <a
            href="/api/articles"
            className="flex flex-col items-center py-1 px-3 rounded-lg text-slate-500 font-medium transition"
          >
            <svg className="w-4 h-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-[9px]">API</span>
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
      {/* Compact Hero Section */}
      <section className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-3.5 sm:p-5 mb-3.5 shadow-sm">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="text-indigo-300 text-[10px] font-semibold">IT Rumah Sakit & Koding</span>
        </div>

        <h1 className="text-sm sm:text-lg font-bold text-white mb-1 leading-snug">
          Catatan & Dokumentasi Teknis
        </h1>
        <p className="text-slate-300 text-[11px] leading-relaxed mb-3 max-w-lg">
          Integrasi rekam medis, SNOMED CT, otomasi alur kerja, dan arsitektur backend.
        </p>

        {/* Compact Search Input */}
        <form method="GET" action="/" className="relative flex items-center">
          <div className="absolute left-2.5 text-slate-400 pointer-events-none">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            name="q"
            placeholder="Cari artikel (SIMRS, SNOMED)..."
            value={searchQuery}
            className="w-full pl-8 pr-16 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:bg-white/15 transition"
          />
          {selectedCategory !== 'Semua' && (
            <input type="hidden" name="cat" value={selectedCategory} />
          )}
          <button
            type="submit"
            className="absolute right-1 px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-md text-[10px] font-bold transition shadow-xs"
          >
            Cari
          </button>
        </form>
      </section>

      {/* Horizontal Scrollable Category Filter */}
      <section className="mb-3">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Kategori</span>
          {(searchQuery || selectedCategory !== 'Semua') && (
            <a
              href="/"
              className="text-[10px] text-rose-500 hover:text-rose-600 font-bold transition"
            >
              ✕ Reset
            </a>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
          {categories.map((c) => {
            const isSelected = (c === selectedCategory) || (!selectedCategory && c === 'Semua');
            const link = c === 'Semua'
              ? (searchQuery ? `/?q=${encodeURIComponent(searchQuery)}` : '/')
              : (searchQuery ? `/?cat=${encodeURIComponent(c)}&q=${encodeURIComponent(searchQuery)}` : `/?cat=${encodeURIComponent(c)}`);

            return (
              <a
                key={c}
                href={link}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all duration-150 border shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured / Latest Article (Compact Card) */}
      {!searchQuery && selectedCategory === 'Semua' && featured && (
        <section className="mb-3.5">
          <a
            href={`/article/${featured.slug}`}
            className="block bg-indigo-50/70 hover:bg-indigo-50/90 rounded-xl p-3 sm:p-4 border border-indigo-100/90 shadow-xs transition active:scale-[0.99] group"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white">
                Terbaru
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(featured.category)}`}>
                {featured.category}
              </span>
              <span className="text-[10px] text-slate-400 ml-auto">
                {featured.read_time} mnt
              </span>
            </div>

            <h2 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-1">
              {featured.title}
            </h2>

            <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-2">
              {featured.excerpt}
            </p>

            <div className="flex items-center justify-between text-[10px] pt-2 border-t border-indigo-100 text-slate-500">
              <span>{featured.author}</span>
              <span className="text-indigo-600 font-bold group-hover:translate-x-0.5 transition">
                Baca →
              </span>
            </div>
          </a>
        </section>
      )}

      {/* Articles List */}
      <section>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {searchQuery ? `Hasil: "${searchQuery}"` : 'Semua Tulisan'}
          </span>
          <span className="text-[10px] text-slate-400">
            {articles.length} artikel
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {(!searchQuery && selectedCategory === 'Semua' ? regularArticles : articles).map((item) => (
            <a
              key={item.id}
              href={`/article/${item.slug}`}
              className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-3.5 shadow-xs hover:border-indigo-300 transition active:scale-[0.99] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1.5">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    {item.read_time} mnt
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-1">
                  {item.title}
                </h3>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-medium text-slate-600">{item.author}</span>
                <span className="font-bold text-indigo-600 group-hover:translate-x-0.5 transition">
                  Baca →
                </span>
              </div>
            </a>
          ))}

          {articles.length === 0 && (
            <div className="col-span-full py-10 text-center bg-white rounded-xl border border-slate-200">
              <p className="text-slate-600 font-bold text-xs">Tidak ada artikel yang cocok</p>
              <a
                href="/"
                className="mt-2 inline-block px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-bold"
              >
                Lihat Semua
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
        {/* Top Back Button */}
        <div className="mb-2">
          <a
            href="/"
            className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-indigo-600 transition py-1 gap-1 active:scale-95"
          >
            <span>← Kembali</span>
          </a>
        </div>

        {/* Compact Article Header Card */}
        <header className="bg-white rounded-xl p-3.5 sm:p-5 border border-slate-200 shadow-xs mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <span className="text-[10px] text-slate-400">•</span>
            <span className="text-[10px] text-slate-400">{article.read_time} mnt baca</span>
          </div>

          <h1 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2.5">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px]">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 rounded-md bg-slate-900 text-white font-bold flex items-center justify-center text-[9px]">
                {article.author.charAt(0)}
              </div>
              <span className="font-semibold text-slate-800">{article.author}</span>
              <span className="text-slate-400">• {article.created_at}</span>
            </div>

            {/* Compact Action Buttons */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                className="px-2 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition flex items-center gap-1 active:scale-95"
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
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded-md transition"
                  title="Hapus"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Article Reading Content */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200/90 shadow-xs">
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
            {paragraphs.map((p, idx) => {
              const trimmed = p.trim();

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xs sm:text-sm font-bold text-slate-900 pt-3 pb-1 border-b border-slate-100">
                    {trimmed.replace(/^###\s+/, '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('- ')) {
                const lines = trimmed.split('\n');
                return (
                  <ul key={idx} className="space-y-1 my-2 pl-0">
                    {lines.map((l, liIdx) => (
                      <li key={liIdx} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                        <span>{l.replace(/^[-\*]\s+/, '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (/^\d+\.\s/.test(trimmed)) {
                const lines = trimmed.split('\n');
                return (
                  <ol key={idx} className="space-y-1 my-2 pl-0">
                    {lines.map((l, liIdx) => {
                      const match = l.match(/^(\d+)\.\s*(.*)/);
                      const num = match ? match[1] : String(liIdx + 1);
                      const text = match ? match[2] : l;
                      return (
                        <li key={liIdx} className="flex items-start gap-1.5">
                          <span className="w-4 h-4 rounded bg-indigo-50 text-indigo-700 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                            {num}
                          </span>
                          <span>{text}</span>
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
          <div className="mt-6 p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
              {article.author.charAt(0)}
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 block">{article.author}</span>
              <span className="text-[10px] text-slate-500 block">IT & Sistem Analis</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Action */}
        <div className="mt-3 flex gap-2">
          <a
            href="/"
            className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 text-center active:scale-95 transition"
          >
            ← Kembali
          </a>
          <button
            type="button"
            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
            onclick={`
              const waUrl = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(${JSON.stringify(article.title)} + '\\n' + window.location.href);
              window.open(waUrl, '_blank');
            `}
          >
            <span>Kirim WhatsApp</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export const CreateArticleForm: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <Layout title="Tulis Artikel Baru — KabarTekno" activeTab="new">
      <div className="max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="mb-3">
          <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Tulis Artikel Baru
          </h1>
          <p className="text-[11px] text-slate-400">
            Catatan lapangan, analisis sistem, atau tips teknis.
          </p>
        </div>

        <form method="POST" action="/articles" className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">Judul Artikel *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Judul artikel..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">Kategori *</label>
              <input
                type="text"
                name="category"
                required
                defaultValue="Hospital IT"
                placeholder="Hospital IT / Pemrograman"
                list="category-options"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition"
              />
              <datalist id="category-options">
                {categories.filter(c => c !== 'Semua').map(c => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">Nama Penulis</label>
              <input
                type="text"
                name="author"
                defaultValue="Antok"
                placeholder="Nama Anda"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-semibold text-slate-700 text-xs">Isi Konten *</label>
              <span className="text-[9px] text-slate-400">### untuk sub-judul</span>
            </div>
            <textarea
              name="content"
              required
              rows={8}
              placeholder="Tuliskan isi artikel Anda di sini..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition leading-relaxed font-sans"
            ></textarea>
          </div>

          <div className="pt-1.5 flex items-center space-x-2">
            <a
              href="/"
              className="flex-1 py-2 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition"
            >
              Batal
            </a>
            <button
              type="submit"
              className="flex-2 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs rounded-lg shadow-xs transition"
            >
              Terbitkan Sekarang 🚀
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
