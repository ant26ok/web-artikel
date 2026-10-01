import assert from 'node:assert';
import { 
  initDb, 
  getAllArticles, 
  getArticleBySlug, 
  getArticleById, 
  createArticle, 
  deleteArticle, 
  getCategories 
} from './db';

console.log('=== RUNNING WEB ARTIKEL INTEGRATION TESTS ===');

// Use in-memory SQLite for testing
const db = initDb(':memory:');

// 1. Check Seeded Articles
const articles = getAllArticles(db);
assert(articles.length >= 3, 'Should have at least 3 seeded articles');
console.log(`✓ Seeded articles verified: ${articles.length} articles`);

// 2. Check Categories
const categories = getCategories(db);
assert(categories.includes('Hospital IT'), 'Must include Hospital IT category');
assert(categories.includes('Semua'), 'Must include Semua category');
console.log(`✓ Categories verified: ${categories.join(', ')}`);

// 3. Create New Article
const newArticle = createArticle(db, {
  title: 'Uji Coba Sistem Informasi Rumah Sakit',
  category: 'Testing',
  author: 'Antok',
  content: 'Ini adalah paragraf pengujian sistem artikel sederhana dengan Bun dan Hono.'
});
assert(newArticle.id > 0);
assert(newArticle.slug.startsWith('uji-coba-sistem'));
assert.strictEqual(newArticle.category, 'Testing');
console.log(`✓ Article created with ID ${newArticle.id} and slug '${newArticle.slug}'`);

// 4. Search Article by keyword
const searchResults = getAllArticles(db, 'Pengujian');
assert(searchResults.length > 0, 'Search should find the newly created article');
assert.strictEqual(searchResults[0].id, newArticle.id);
console.log('✓ Search query verified');

// 5. Filter Article by category
const catResults = getAllArticles(db, undefined, 'Testing');
assert(catResults.length === 1);
assert.strictEqual(catResults[0].id, newArticle.id);
console.log('✓ Category filter verified');

// 6. Get Article by Slug and ID
const bySlug = getArticleBySlug(db, newArticle.slug);
assert(bySlug !== null && bySlug.id === newArticle.id);
const byId = getArticleById(db, newArticle.id);
assert(byId !== null && byId.slug === newArticle.slug);
console.log('✓ Lookup by slug and ID verified');

// 7. Delete Article
const isDeleted = deleteArticle(db, newArticle.id);
assert.strictEqual(isDeleted, true);
assert.strictEqual(getArticleById(db, newArticle.id), null);
console.log('✓ Delete article verified');

console.log('=== ALL TESTS PASSED SUCCESSFULLY ===');
process.exit(0);
