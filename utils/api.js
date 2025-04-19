export async function searchBooks(query, filters = {}) {
  const { language, medium } = filters;

  // Build the query string with filters
  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
  if (language) {
    url += `&language=${encodeURIComponent(language)}`;
  }
  if (medium === 'ebook') {
    url += `&has_fulltext=true`;
  }

  const response = await fetch(url);
  const data = await response.json();

  // Add the cover URL to each book
  const books = data.docs.map((book) => ({
    ...book,
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : 'https://via.placeholder.com/100x150?text=No+Cover',
  }));

  return books || [];
}
