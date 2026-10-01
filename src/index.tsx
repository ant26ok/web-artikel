import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { 
  initDb, 
  getAllArticles, 
  getArticleBySlug, 
  getArticleById, 
  createArticle, 
  deleteArticle, 
  getCategories 
} from './db';
import { ArticleList, ArticleDetail, CreateArticleForm } from './views';

const app = new Hono();
const db = initDb();

app.use('*', logger());
app.use('*', cors());

// --- HTML Web Pages ---

// 1. Homepage & List
app.get('/', (c) => {
  const query = c.req.query('q') || '';
  const category = c.req.query('cat') || 'Semua';
  const articles = getAllArticles(db, query, category);
  const categories = getCategories(db);

  return c.html(
    <ArticleList
      articles={articles}
      categories={categories}
      selectedCategory={category}
      searchQuery={query}
    />
  );
});

// 2. Read Article Page
app.get('/article/:slug', (c) => {
  const slug = c.req.param('slug');
  const article = getArticleBySlug(db, slug);

  if (!article) {
    return c.html(
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1>404 - Artikel Tidak Ditemukan</h1>
        <p><a href="/">Kembali ke Beranda</a></p>
      </div>,
      404
    );
  }

  return c.html(<ArticleDetail article={article} />);
});

// 3. New Article Page
app.get('/new', (c) => {
  const categories = getCategories(db);
  return c.html(<CreateArticleForm categories={categories} />);
});

// 4. Handle Form Create Article
app.post('/articles', async (c) => {
  const body = await c.req.parseBody();
  const title = String(body['title'] || '').trim();
  const category = String(body['category'] || 'Teknologi').trim();
  const author = String(body['author'] || 'Antok').trim();
  const content = String(body['content'] || '').trim();

  if (!title || !content) {
    return c.text('Judul dan isi artikel wajib diisi.', 400);
  }

  const created = createArticle(db, { title, category, author, content });
  return c.redirect(`/article/${created.slug}`);
});

// 5. Handle Form Delete Article
app.post('/api/articles/:id/delete', (c) => {
  const id = Number(c.req.param('id'));
  deleteArticle(db, id);
  return c.redirect('/');
});


// --- REST API Endpoints ---

// API 1: Get all articles (JSON)
app.get('/api/articles', (c) => {
  const query = c.req.query('q');
  const category = c.req.query('category');
  const articles = getAllArticles(db, query, category);
  return c.json(articles);
});

// API 2: Get single article by ID or slug (JSON)
app.get('/api/articles/:idOrSlug', (c) => {
  const param = c.req.param('idOrSlug');
  const id = Number(param);
  const article = !isNaN(id) ? getArticleById(db, id) : getArticleBySlug(db, param);

  if (!article) {
    return c.json({ error: 'Artikel tidak ditemukan' }, 404);
  }
  return c.json(article);
});

// API 3: Create article (JSON)
app.post('/api/articles', async (c) => {
  const body = await c.req.json();
  const { title, category, author, content } = body;

  if (!title || !content) {
    return c.json({ error: 'Field `title` dan `content` wajib diisi' }, 400);
  }

  const article = createArticle(db, { title, category, author, content });
  return c.json(article, 201);
});

// API 4: Delete article (JSON)
app.delete('/api/articles/:id', (c) => {
  const id = Number(c.req.param('id'));
  const success = deleteArticle(db, id);
  if (!success) {
    return c.json({ error: 'Artikel tidak ditemukan' }, 404);
  }
  return c.json({ success: true, id });
});

// API 5: Categories
app.get('/api/categories', (c) => {
  return c.json(getCategories(db));
});

const PORT = Number(process.env.PORT || 3002);

export default {
  port: PORT,
  fetch: app.fetch,
};
