export async function searchBooks(query) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.docs || [];
}
