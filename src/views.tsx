import type { FC } from 'hono/jsx';
import type { Article } from './db';

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'Hospital IT':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
    case 'Pemrograman':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20';
    case 'Standar Medis':
      return 'bg-amber-50 text-amber-800 border-amber-200 ring-amber-500/20';
    default:
      return 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/20';
  }
};

export const Layout: FC<{ title?: string; children: any; isDetail?: boolean }> = ({ 
  title = 'KabarTekno — Catatan & Artikel IT', 
  children,
  isDetail = false 
}) => {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <title>{title}</title>
        {/* Tailwind CSS with Typography & Forms plugins */}
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
          body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
          pre, code { font-family: 'JetBrains Mono', monospace; }
        `}</style>
      </head>
      <body className="bg-slate-50/70 text-slate-800 min-h-screen flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        {/* Reading Progress Indicator (Only on Detail view) */}
        {isDetail && (
          <div id="read-progress" className="fixed top-0 left-0 h-1 bg-indigo-600 z-50 transition-all duration-150 w-0"></div>
        )}

        {/* Top Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 transition-shadow duration-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition duration-200">
                KT
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 block leading-tight group-hover:text-indigo-600 transition">
                  KabarTekno
                </span>
                <span className="text-[11px] text-slate-500 font-medium block">
                  Catatan IT, Rumah Sakit & Koding
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center space-x-3">
              <a
                href="/"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition"
              >
                Semua Artikel
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

            {/* Mobile Header Action */}
            <div className="sm:hidden flex items-center space-x-2">
              <a
                href="/new"
                className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm flex items-center justify-center"
                aria-label="Tulis Artikel"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200/80 py-8 text-center text-xs text-slate-500 mt-12 pb-20 sm:pb-8">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-black">
                KT
              </div>
              <span className="font-semibold text-slate-700">KabarTekno</span>
              <span>— Catatan arsitektur & rekam medis</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/api/articles" className="font-medium hover:text-indigo-600 transition">
                API JSON
              </a>
              <span className="text-slate-300">•</span>
              <a href="https://github.com/ant26ok/web-artikel" target="_blank" className="font-medium hover:text-indigo-600 transition">
                GitHub Repo
              </a>
            </div>
          </div>
        </footer>

        {/* Mobile Sticky Bottom Nav */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 py-2.5 flex items-center justify-around z-40 shadow-lg">
          <a href="/" className="flex flex-col items-center text-slate-600 hover:text-indigo-600 transition">
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] font-semibold">Beranda</span>
          </a>
          <a href="/new" className="flex flex-col items-center text-indigo-600 transition">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center -mt-4 shadow-md shadow-indigo-600/30">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 mt-0.5">Tulis</span>
          </a>
          <a href="/api/articles" className="flex flex-col items-center text-slate-600 hover:text-indigo-600 transition">
            <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="text-[10px] font-semibold">API</span>
          </a>
        </div>

        {/* Scroll Progress Script */}
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
    <Layout title="KabarTekno — Catatan & Artikel IT">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 mb-10 shadow-xl shadow-slate-900/10">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-violet-500/15 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Edisi IT Rumah Sakit & Software Engineering</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white mb-3">
            Eksplorasi Teknologi, SIMRS & Otomasi
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Berbagi pengalaman riil membedah integrasi rekam medis, SNOMED CT, workflow n8n, dan arsitektur backend modern.
          </p>

          {/* Search Bar */}
          <form method="GET" action="/" className="relative flex items-center max-w-lg">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="q"
              placeholder="Cari topik (misal: SIMRS, SNOMED, Hono)..."
              value={searchQuery}
              className="w-full pl-10 pr-24 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition shadow-inner"
            />
            {selectedCategory !== 'Semua' && (
              <input type="hidden" name="cat" value={selectedCategory} />
            )}
            <button
              type="submit"
              className="absolute right-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Cari
            </button>
          </form>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Topik</span>
          {(searchQuery || selectedCategory !== 'Semua') && (
            <a
              href="/"
              className="text-xs text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-1 transition"
            >
              ✕ Reset Filter
            </a>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((c) => {
            const isSelected = (c === selectedCategory) || (!selectedCategory && c === 'Semua');
            const link = c === 'Semua'
              ? (searchQuery ? `/?q=${encodeURIComponent(searchQuery)}` : '/')
              : (searchQuery ? `/?cat=${encodeURIComponent(c)}&q=${encodeURIComponent(searchQuery)}` : `/?cat=${encodeURIComponent(c)}`);

            return (
              <a
                key={c}
                href={link}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10 scale-100'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {c}
              </a>
            );
          })}
        </div>
      </section>

      {/* Featured Article (Hero Card) */}
      {!searchQuery && selectedCategory === 'Semua' && featured && (
        <section className="mb-10">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
                ⭐ Artikel Pilihan
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getCategoryColor(featured.category)}`}>
                {featured.category}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-3">
              <a href={`/article/${featured.slug}`}>{featured.title}</a>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
              {featured.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-indigo-100/80 text-xs">
              <div className="flex items-center space-x-3 text-slate-600 font-medium">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  {featured.author.charAt(0)}
                </div>
                <span>Ditulis oleh <strong className="text-slate-900">{featured.author}</strong></span>
                <span>•</span>
                <span>{featured.read_time} menit baca</span>
              </div>

              <a
                href={`/article/${featured.slug}`}
                className="px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition duration-200 flex items-center gap-1.5 shadow-sm"
              >
                <span>Baca Lengkap</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Semua Tulisan'}
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {articles.length} artikel ditemukan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(!searchQuery && selectedCategory === 'Semua' ? regularArticles : articles).map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item.read_time} mnt</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-2.5">
                  <a href={`/article/${item.slug}`}>{item.title}</a>
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-slate-500">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                    {item.author.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-700">{item.author}</span>
                </div>

                <a
                  href={`/article/${item.slug}`}
                  className="font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
                >
                  <span>Baca</span>
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}

          {articles.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-slate-800">Artikel Tidak Ditemukan</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
              </p>
              <a
                href="/"
                className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
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
    <Layout title={`${article.title} — KabarTekno`} isDetail={true}>
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6 font-medium">
          <a href="/" className="hover:text-indigo-600 transition">Beranda</a>
          <span>/</span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-snug mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white font-black flex items-center justify-center text-sm shadow-md">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block leading-tight">{article.author}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span>{article.read_time} menit membaca</span>
                  <span>•</span>
                  <span>{article.created_at}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons: Native Share (HP) & Delete */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                id="share-btn"
                className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
                onclick={`
                  if (navigator.share) {
                    navigator.share({
                      title: ${JSON.stringify(article.title)},
                      url: window.location.href
                    }).catch(()=>{});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link artikel berhasil disalin!');
                  }
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Bagikan</span>
              </button>

              <form
                method="POST"
                action={`/api/articles/${article.id}/delete`}
                onsubmit="return confirm('Apakah Anda yakin ingin menghapus artikel ini?');"
              >
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 rounded-xl transition"
                >
                  Hapus
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate prose-indigo sm:prose-lg max-w-none text-slate-700 leading-relaxed font-normal">
          {paragraphs.map((p, idx) => {
            const trimmed = p.trim();

            // Heading 3
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-black text-slate-900 pt-6 pb-1 border-b border-slate-100">
                  {trimmed.replace(/^###\s+/, '')}
                </h3>
              );
            }

            // Bullet List
            if (trimmed.startsWith('- ')) {
              const lines = trimmed.split('\n');
              return (
                <ul key={idx} className="space-y-2 my-4 pl-0 list-none">
                  {lines.map((l, liIdx) => (
                    <li key={liIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0"></span>
                      <span>{l.replace(/^[-\*]\s+/, '')}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            // Numbered List
            if (/^\d+\.\s/.test(trimmed)) {
              const lines = trimmed.split('\n');
              return (
                <ol key={idx} className="space-y-2 my-4 pl-0 list-none">
                  {lines.map((l, liIdx) => {
                    const match = l.match(/^(\d+)\.\s*(.*)/);
                    const num = match ? match[1] : String(liIdx + 1);
                    const text = match ? match[2] : l;
                    return (
                      <li key={liIdx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {num}
                        </span>
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ol>
              );
            }

            // Standard Paragraph
            return <p key={idx} className="my-4 text-slate-700 leading-relaxed text-sm sm:text-base">{trimmed}</p>;
          })}
        </article>

        {/* Author Card Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow-md">
            {article.author.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Ditulis oleh {article.author}</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Full-stack Programmer & Sistem Analis. Menulis seputar solusi IT rumah sakit, otomasi alur kerja, dan koding.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
          <a
            href="/"
            className="font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Kembali ke Beranda</span>
          </a>
          <a
            href="/new"
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition shadow-xs"
          >
            + Tulis Artikel Baru
          </a>
        </div>
      </div>
    </Layout>
  );
};

export const CreateArticleForm: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <Layout title="Tulis Artikel Baru — KabarTekno">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Editor Artikel
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Tulis Artikel Baru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Bagikan catatan lapangan, analisis sistem, atau tips teknis untuk pembaca.
          </p>
        </div>

        <form method="POST" action="/articles" className="space-y-5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 text-sm">Judul Artikel *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Contoh: Menangani Antrean IGD dengan Sistem Notifikasi Real-time"
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5 text-sm">Kategori *</label>
              <input
                type="text"
                name="category"
                required
                defaultValue="Hospital IT"
                placeholder="Pilih atau ketik kategori..."
                list="category-options"
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              <datalist id="category-options">
                {categories.filter(c => c !== 'Semua').map(c => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5 text-sm">Nama Penulis</label>
              <input
                type="text"
                name="author"
                defaultValue="Antok"
                placeholder="Nama Anda"
                className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-bold text-slate-700 text-sm">Isi Konten *</label>
              <span className="text-[11px] text-slate-400">Gunakan ### untuk judul bagian</span>
            </div>
            <textarea
              name="content"
              required
              rows={14}
              placeholder="Tuliskan pengalaman atau artikel Anda di sini...

### Latar Belakang
Tulis masalah yang dihadapi...

### Solusi Teknis
Tulis solusi dan alur kerja..."
              className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white font-sans transition leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
            <a
              href="/"
              className="px-5 py-3 text-slate-600 hover:text-slate-800 font-bold rounded-2xl transition"
            >
              Batal
            </a>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-md shadow-indigo-600/25 transition"
            >
              Terbitkan Sekarang 🚀
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
