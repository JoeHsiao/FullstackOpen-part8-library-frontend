import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [filterGenre, setFilterGenre] = useState('')
  const [getAllBooks, result] = useLazyQuery(ALL_BOOKS, { fetchPolicy: 'network-only' })

  useEffect(() => {
    if (props.show) {
      filterGenre
        ? getAllBooks({ variables: { genre: filterGenre } })
        : getAllBooks()
    }
  }, [filterGenre, getAllBooks, props.show])

  if (!props.show) {
    return null
  }

  if (!result.data) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  return (
    <div>
      <h2>books in genre '{filterGenre}'</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
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
