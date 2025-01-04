import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR_BORN_YEAR } from '../queries';

import Select from 'react-select';
import { useState } from 'react';

const Authors = ({ show }) => {
    const { data, loading } = useQuery(ALL_AUTHORS, {pollInterval: 1000});
    const [ changeAuthorBornYear ] = useMutation(EDIT_AUTHOR_BORN_YEAR); 
    const [ toEditAuthor, setToEditAuthor ] = useState(null);
    const [ toEditBorn, setToEditBorn ] = useState('');

    if (!show) {
        return null;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
        <h2>authors</h2>
        <table>
            <thead>
            <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
            </tr>
            </thead>
            <tbody>
            {data.allAuthors.map((author) => (
                <tr key={author.name}>
                <td>{author.name}</td>
                <td>{author.born}</td>
                <td>{author.bookCount}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div>
            <h1>Set birthyear</h1>
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    options={data.allAuthors.map((author) => ({value: author.name, label: author.name}))}
                    onChange={(authorName) => setToEditAuthor(authorName.value)}
                />
                <input value={toEditBorn} onChange={e => setToEditBorn(e.target.value)}></input>
                <button onClick={() => changeAuthorBornYear( { variables: { name: toEditAuthor, setBornYear: parseInt(toEditBorn, 10) } } )}>update author</button>
            </div>
        </div>
        </div>
    );
};

export default Authors;
