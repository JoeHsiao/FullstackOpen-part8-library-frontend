import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"
import PropTypes from 'prop-types'
import { useState } from 'react'

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState('')

  const result = useQuery(ALL_BOOKS)
  if (result.loading) {
    return <div>Loading...</div>
  }

  const books =
    result.data.allBooks

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(x => !filterGenre || x.genres.includes(filterGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => setFilterGenre('refactoring')}>refactoring</button>
      <button onClick={() => setFilterGenre('agile')}>agile</button>
      <button onClick={() => setFilterGenre('patterns')}>patterns</button>
      <button onClick={() => setFilterGenre('design')}>design</button>
      <button onClick={() => setFilterGenre('')}>all genres</button>
    </div>
  )
}
Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books
