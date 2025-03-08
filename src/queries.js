import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
  `
export const ALL_BOOKS = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      title
      published
      genres
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $bornyear: Int!) {
    editAuthor(
      name: $name
      setBornTo: $bornyear
    ) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const ME = gql`
  query Query {
    me {
      username
      favoriteGenre
    }
  }
`
export const PERSON_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`