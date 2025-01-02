import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
  const { data, loading } = useQuery(ALL_BOOKS, { pollInterval: 1000 });

  if (!show) {
    return null;
  }

  if (loading) {
    return <div>loading...</div>;
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
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
