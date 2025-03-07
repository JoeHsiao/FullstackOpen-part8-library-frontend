import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // const updateGenreCache = (cache, response, genre) => {
  //   cache.updateQuery({
  //     query: ALL_BOOKS,
  //     variables: { genre: genre }
  //   }, (data) => {
  //     if (!data)
  //       return null
  //     console.log('allbooks', data)
  //     console.log('response', response)
  //     return {
  //       allBooks: data.allBooks.concat(response.data.addBook)
  //     }
  //   })
  // }
  const [addBook] = useMutation(ADD_BOOK)
  //   update: (cache, response) => {
  //     genres.map(x => updateGenreCache(cache, response, x))
  //   }
  // })

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    await addBook({ variables: { title, author, published: Number(published), genres } })
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook