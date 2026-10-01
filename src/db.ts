import { Database } from 'bun:sqlite';

export interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  author: string;
  content: string;
  excerpt: string;
  read_time: number;
  created_at: string;
}

export function initDb(dbPath = 'articles.sqlite') {
  const db = new Database(dbPath);
  db.run('PRAGMA journal_mode = WAL;');
  db.run('PRAGMA synchronous = NORMAL;');

  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL DEFAULT 'Teknologi',
      author TEXT NOT NULL DEFAULT 'Antok',
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      read_time INTEGER NOT NULL DEFAULT 3,
      created_at TEXT NOT NULL DEFAULT (datetime('now', '+7 hours'))
    );
  `);

  const count = db.query('SELECT count(*) as total FROM articles;').get() as { total: number };
  if (count.total === 0) {
    const seedArticles = [
      {
        title: 'Membangun Integrasi SIMRS Berbasis Event-Driven dengan n8n',
        slug: 'integrasi-simrs-event-driven-n8n',
        category: 'Hospital IT',
        author: 'Antok',
        excerpt: 'Bagaimana pendekatan webhook dan otomasi alur kerja ringan mampu memotong keterlambatan antrean farmasi dan registrasi pasien tanpa mengubah kode monolitik besar.',
        content: `Di era digitalisasi fasilitas kesehatan, integrasi antar-unit sering kali menjadi tantangan terbesar. Banyak sistem rumah sakit berjalan dalam silo masing-masing: rekam medis elektronik, sistem farmasi, laboratorium, dan kasir.

Sering kali dokter atau staf administrasi harus menginput data yang sama berkali-kali di aplikasi yang berbeda. Ketika terjadi perubahan status pemeriksaan, informasi lambat sampai ke unit penunjang.

### Pendekatan Event-Driven

Alih-alih merombak total arsitektur sistem yang sudah berjalan, pendekatan yang sangat efektif adalah menggunakan arsitektur berbasis event (event-driven) melalui workflow automation seperti n8n:

1. **Trigger Webhook:** Setiap kali resep selesai diverifikasi dokter, SIMRS memicu webhook HTTP POST ke server orkestrasi.
2. **Payload Transformation:** n8n mem-parsing data pasien, nama obat, dan nomor rekam medis ke dalam format JSON standar.
3. **Dispatch Multi-Endpoint:** Notifikasi langsung dikirim ke monitor antrean farmasi dan nomor WhatsApp pasien secara bersamaan.

### Keuntungan Praktis
- **Tanpa Downtime:** Modul lama tetap berjalan normal.
- **Transparan & Terpantau:** Semua log pengiriman data terekam rapi.
- **Peningkatan Kepuasan Pasien:** Waktu tunggu obat berkurang hingga 40%.`,
        read_time: 4,
      },
      {
        title: 'SNOMED CT untuk Rekam Medis: Menjembatani Istilah Lokal dan Standar Global',
        slug: 'snomed-ct-rekam-medis-istilah-lokal',
        category: 'Standar Medis',
        author: 'Antok',
        excerpt: 'Menerapkan terminologi klinis SNOMED CT di Indonesia memerlukan pemetaan bahasa daerah agar keluhan pasien tetap tercatat akurat dan interoperabel di SATUSEHAT.',
        content: `Ketika seorang pasien di Jawa Tengah mengeluh "boyok loro" atau "sirah ngelu", bagaimana data tersebut harus dicatat agar diakui oleh sistem interoperabilitas nasional seperti SATUSEHAT Kemenkes?

Di sinilah peran penting SNOMED CT (*Systematized Nomenclature of Medicine -- Clinical Terms*).

### Konsep vs Istilah

SNOMED CT memisahkan secara tegas antara **makna klinis (Concept ID)** dan **istilah deskripsi (Description)**:

- **Concept ID:** 279039007 (Low back pain)
- **Istilah Baku (ID):** Nyeri punggung bawah
- **Sinonim Daerah (JV):** Boyok loro, Keceklik boyok

Dengan membuat layer mapping lokal di database SIMRS, perawat atau dokter dapat mengetikkan istilah yang diucapkan pasien secara alami, sementara sistem di balik layar otomatis mengonversinya menjadi kode Concept ID resmi sebelum dikirim via format FHIR Condition.`,
        read_time: 3,
      },
      {
        title: 'Mengapa Hono dan Bun Menjadi Kombinasi Favorit Microservices Saat Ini',
        slug: 'hono-dan-bun-kombinasi-favorit-microservices',
        category: 'Pemrograman',
        author: 'Antok',
        excerpt: 'Performa startup mendekati instan, footprint memori minimal, dan dukungan TypeScript bawaan tanpa bundler rumit menjadikan Bun + Hono pilihan terbaik untuk API modern.',
        content: `Dunia runtime JavaScript telah berkembang pesat. Bun hadir bukan sekadar sebagai alternatif Node.js, tetapi sebagai runtime all-in-one yang menyertakan bundler, test runner, package manager, dan native SQLite driver.

Dipadukan dengan framework web minimalis **Hono**, pengembangan API menjadi sangat menyenangkan:

### 1. Startup Time Ekstrem
Bun mampu memulai service dalam hitungan milidetik. Dalam arsitektur serverless atau kontainer Docker microservices, ini berarti latensi cold-start hampir tidak terasa.

### 2. Native TypeScript Tanpa Transpiler Terpisah
Tidak perlu lagi mengonfigurasi ts-node, tsx, atau build pipeline rumit sebelum menjalankan kode. Bun mengeksekusi TypeScript secara langsung.

### 3. API Bersih & Kompatibel Multi-Platform
Hono didesain dengan Web Standards (Fetch API, Request, Response). Kode yang ditulis untuk Bun dapat dengan mudah dipindahkan ke Cloudflare Workers, Deno, atau Node.js tanpa banyak perubahan.`,
        read_time: 3,
      },
    ];

    const stmt = db.prepare(`
      INSERT INTO articles (title, slug, category, author, content, excerpt, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `);

    for (const a of seedArticles) {
      stmt.run(a.title, a.slug, a.category, a.author, a.content, a.excerpt, a.read_time);
    }
    console.log(`Seeded ${seedArticles.length} initial articles.`);
  }

  return db;
}

export function getAllArticles(db: Database, query?: string, category?: string): Article[] {
  let sql = 'SELECT * FROM articles WHERE 1=1';
  const params: Record<string, string> = {};

  if (category && category !== 'Semua') {
    sql += ' AND category = $cat';
    params.$cat = category;
  }

  if (query && query.trim()) {
    sql += ' AND (title LIKE $q OR content LIKE $q OR excerpt LIKE $q)';
    params.$q = `%${query.trim()}%`;
  }

  sql += ' ORDER BY id DESC;';
  return db.query(sql).all(params) as Article[];
}

export function getArticleBySlug(db: Database, slug: string): Article | null {
  return db.query('SELECT * FROM articles WHERE slug = ?;').get(slug) as Article | null;
}

export function getArticleById(db: Database, id: number): Article | null {
  return db.query('SELECT * FROM articles WHERE id = ?;').get(id) as Article | null;
}

export function createArticle(
  db: Database,
  data: { title: string; category: string; author?: string; content: string }
): Article {
  const author = data.author?.trim() || 'Antok';
  const slugBase = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'artikel';
  
  let slug = slugBase;
  let counter = 1;
  while (getArticleBySlug(db, slug)) {
    slug = `${slugBase}-${counter++}`;
  }

  // Generate excerpt from first 180 chars of content
  const cleanContent = data.content.replace(/[#*`_]/g, '').trim();
  const excerpt = cleanContent.slice(0, 180) + (cleanContent.length > 180 ? '...' : '');

  // Calculate read time (~200 words per minute)
  const wordCount = data.content.split(/\s+/).length;
  const read_time = Math.max(1, Math.ceil(wordCount / 200));

  const stmt = db.prepare(`
    INSERT INTO articles (title, slug, category, author, content, excerpt, read_time)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING *;
  `);

  return stmt.get(data.title, slug, data.category || 'Teknologi', author, data.content, excerpt, read_time) as Article;
}

export function deleteArticle(db: Database, id: number): boolean {
  const res = db.run('DELETE FROM articles WHERE id = ?;', [id]);
  return res.changes > 0;
}

export function getCategories(db: Database): string[] {
  const rows = db.query('SELECT DISTINCT category FROM articles ORDER BY category ASC;').all() as Array<{ category: string }>;
  return ['Semua', ...rows.map(r => r.category)];
}
