import type { FC } from 'hono/jsx';
import type { Article } from './db';

export const Layout: FC<{ title?: string; children: any }> = ({ title = 'Web Artikel Sederhana', children }) => {
  return (
    <html lang="id">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
        `}</style>
      </head>
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col antialiased">
        {/* Navigation Bar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2.5 group">
              <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-indigo-700 transition">
                A
              </span>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  KabarTekno
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">Artikel IT & Opini</span>
              </div>
            </a>

            <nav className="flex items-center space-x-2 sm:space-x-3">
              <a
                href="/"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition"
              >
                Semua Artikel
              </a>
              <a
                href="/new"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs transition flex items-center space-x-1"
              >
                <span>+</span>
                <span>Tulis Artikel</span>
              </a>
            </nav>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 KabarTekno — Dibangun dengan Bun + Hono + SQLite</span>
            <div className="flex space-x-4">
              <a href="/api/articles" className="hover:text-indigo-600 transition">REST API</a>
              <a href="https://github.com/ant26ok" target="_blank" className="hover:text-indigo-600 transition">GitHub</a>
            </div>
          </div>
        </footer>
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
  return (
    <Layout title="KabarTekno — Koleksi Artikel">
      {/* Hero Header */}
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Tulisan & Catatan Pengalaman
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Eksplorasi seputar sistem informasi rumah sakit, pemrograman, otomasi alur kerja, dan arsitektur data.
        </p>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <form method="GET" action="/" className="flex-1 flex gap-2">
            <input
              type="text"
              name="q"
              placeholder="Cari judul atau isi artikel..."
              value={searchQuery}
              className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
            />
            {selectedCategory !== 'Semua' && (
              <input type="hidden" name="cat" value={selectedCategory} />
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
            >
              Cari
            </button>
            {(searchQuery || selectedCategory !== 'Semua') && (
              <a
                href="/"
                className="px-3 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-300 transition flex items-center"
              >
                Reset
              </a>
            )}
          </form>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto mt-4 pb-1">
          {categories.map((c) => {
            const isSelected = (c === selectedCategory) || (!selectedCategory && c === 'Semua');
            const link = c === 'Semua'
              ? (searchQuery ? `/?q=${encodeURIComponent(searchQuery)}` : '/')
              : (searchQuery ? `/?cat=${encodeURIComponent(c)}&q=${encodeURIComponent(searchQuery)}` : `/?cat=${encodeURIComponent(c)}`);

            return (
              <a
                key={c}
                href={link}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {c}
              </a>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {articles.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2.5">
                <span className="font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                  {item.category}
                </span>
                <span className="text-slate-400 font-medium">
                  {item.read_time} menit baca
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition leading-snug mb-2">
                <a href={`/article/${item.slug}`}>{item.title}</a>
              </h2>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {item.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium text-slate-700">Oleh {item.author}</span>
              <a
                href={`/article/${item.slug}`}
                className="font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1"
              >
                Baca selengkapnya →
              </a>
            </div>
          </article>
        ))}

        {articles.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm font-medium">Tidak ada artikel yang cocok dengan pencarian.</p>
            <a href="/" className="mt-3 inline-block text-xs font-bold text-indigo-600 hover:underline">
              Tampilkan semua artikel
            </a>
          </div>
        )}
      </section>
    </Layout>
  );
};

export const ArticleDetail: FC<{ article: Article }> = ({ article }) => {
  // Format paragraphs from markdown content
  const paragraphs = article.content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <Layout title={`${article.title} — KabarTekno`}>
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <a
          href="/"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 transition mb-6 gap-1"
        >
          ← Kembali ke daftar artikel
        </a>

        {/* Header Post */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
              {article.category}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-500 font-medium">
              {article.read_time} menit membaca
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-xs text-slate-500">
              {article.created_at}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pb-6 border-b border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">{article.author}</span>
                <span className="text-[11px] text-slate-500">Penulis</span>
              </div>
            </div>

            <form
              method="POST"
              action={`/api/articles/${article.id}/delete`}
              onsubmit="return confirm('Yakin ingin menghapus artikel ini?');"
            >
              <button
                type="submit"
                className="px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition font-medium"
              >
                Hapus Artikel
              </button>
            </form>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-4">
          {paragraphs.map((p, idx) => {
            const trimmed = p.trim();
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 pt-4 pb-1">
                  {trimmed.replace(/^###\s+/, '')}
                </h3>
              );
            }
            if (trimmed.startsWith('- ')) {
              const lines = trimmed.split('\n');
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3">
                  {lines.map((l, liIdx) => (
                    <li key={liIdx}>{l.replace(/^[-\*]\s+/, '')}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\.\s/.test(trimmed)) {
              const lines = trimmed.split('\n');
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-1.5 my-3">
                  {lines.map((l, liIdx) => (
                    <li key={liIdx}>{l.replace(/^\d+\.\s+/, '')}</li>
                  ))}
                </ol>
              );
            }
            return <p key={idx}>{trimmed}</p>;
          })}
        </article>

        {/* Bottom CTA */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <a
            href="/"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
          >
            ← Baca Artikel Lainnya
          </a>
          <a
            href="/new"
            className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition"
          >
            Tulis Artikel Baru
          </a>
        </div>
      </div>
    </Layout>
  );
};

export const CreateArticleForm: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <Layout title="Tulis Artikel Baru — KabarTekno">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Tulis Artikel Baru</h1>
          <p className="text-xs text-slate-500 mt-1">
            Bagikan catatan teknis, pengalaman kerja, atau ulasan teknologi Anda.
          </p>
        </div>

        <form method="POST" action="/articles" className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">Judul Artikel *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Contoh: Pengalaman Mengelola Jaringan Rumah Sakit..."
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Kategori *</label>
              <input
                type="text"
                name="category"
                required
                defaultValue="Hospital IT"
                placeholder="Hospital IT / Pemrograman / dll"
                list="category-options"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <datalist id="category-options">
                {categories.filter(c => c !== 'Semua').map(c => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Nama Penulis</label>
              <input
                type="text"
                name="author"
                defaultValue="Antok"
                placeholder="Nama Anda"
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Isi Artikel * (Mendukung format paragraf & heading ###)
            </label>
            <textarea
              name="content"
              required
              rows={12}
              placeholder="Tuliskan isi artikel Anda di sini..."
              className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono transition leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3">
            <a
              href="/"
              className="px-4 py-2.5 text-slate-600 hover:text-slate-800 font-semibold rounded-xl transition"
            >
              Batal
            </a>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition"
            >
              Terbitkan Artikel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
