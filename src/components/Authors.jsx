import { useQuery, gql } from '@apollo/client'
import PropTypes from 'prop-types'

const Authors = (props) => {
  const query = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
  `
  const result = useQuery(query)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
Authors.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Authors
