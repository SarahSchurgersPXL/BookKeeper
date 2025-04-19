export async function searchBooks(query, filters = {}, page = 0, maxResults = 20) {
  const offset = page * maxResults;
  let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${maxResults}&offset=${offset}`;

  console.log('URL:', url); // Log the URL for debugging
  const response = await fetch(url);
  const data = await response.json();

  let books = data.docs?.map((item, index) => {
    return {
      id: item.key || `book-${index}`,
      title: item.title || 'Unknown Title',
      author_name: item.author_name || ['Unknown Author'],
      coverUrl: item.cover_i
        ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        : 'https://via.placeholder.com/100x150?text=No+Cover',
      publish_year: item.first_publish_year ? [item.first_publish_year.toString()] : ['Unknown Year'],
      language: item.language || [],
      editions: item.isbn || [],
    };
  }) || [];

  return books;
}