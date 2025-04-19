import AsyncStorage from '@react-native-async-storage/async-storage';

export async function addBookToList(list, book) {
  const key = `@books_${list}`;
  const existing = await AsyncStorage.getItem(key);
  const books = existing ? JSON.parse(existing) : [];
  books.push(book);
  await AsyncStorage.setItem(key, JSON.stringify(books));
}

export async function getBooksFromList(list) {
  const key = `@books_${list}`;
  const existing = await AsyncStorage.getItem(key);
  return existing ? JSON.parse(existing) : [];
}
