import { useApolloClient, useQuery } from "@apollo/client"
import PropTypes from 'prop-types'
import { ME, ALL_BOOKS } from '../queries'

const Recommend = (props) => {
  const client = useApolloClient()
  const result = useQuery(ME, {
    skip: !props.show
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>Loading...</p>
  }

  const favoriteGenre = result.data.me.favoriteGenre
  const { allBooks } = client.readQuery({ query: ALL_BOOKS })
  const filteredBooks = allBooks.filter(x => x.genres.includes(favoriteGenre))

  return (
    <div>
      <h3>recommendations</h3>
      <p>boos in your favorite genre <strong>{favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

Recommend.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Recommend