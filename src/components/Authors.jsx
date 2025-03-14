import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Select from 'react-select'

const Authors = (props) => {
  const [nameOption, setNameOption] = useState(null)
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [editBorn] = useMutation(EDIT_BORN)

  const handleChangeBorn = async () => {
    const result = await editBorn({ variables: { name: nameOption.value, bornyear: Number(born) } })
    console.log(result)
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors
  const options = authors.map(x => ({ value: x.name, label: x.name }))

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

      <h3>Set birthyear</h3>
      <div>
        {/* name <input value={name} onChange={(event) => setName(event.target.value)} /> */}
        <Select
          options={options}
          onChange={setNameOption}
        />
      </div>
      <div>
        born <input value={born} onChange={(event) => setBorn(event.target.value)} />
      </div>
      <div>
        <button onClick={handleChangeBorn}>change birthyear</button>
      </div>
    </div>
  )
}
Authors.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Authors
