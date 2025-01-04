import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

//MUTATIONS

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
    }
  }`;

export const EDIT_AUTHOR_BORN_YEAR = gql`
  mutation editAuthorBornYear($name: String!, $setBornYear: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornYear
    )
    {
      name,
      born
    }
  }
`;