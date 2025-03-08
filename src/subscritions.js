import { ALL_BOOKS } from './queries'

export const addBookToCache = (cache, book) => {
  book.genres.concat(null).map(genre => {
    cache.updateQuery({
      query: ALL_BOOKS,
      variables: genre ? { genre: genre } : null
    }, (existingCache) => {
      if (!existingCache)
        return null
      const duplicate = existingCache.allBooks.some(x => x.id === book.id)
      console.log('existing cache', existingCache)
      console.log('book', book);
      return duplicate
        ? existingCache
        : { allBooks: existingCache.allBooks.concat(book) }
    })
  })
}