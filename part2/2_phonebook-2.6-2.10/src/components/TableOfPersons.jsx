const TableOfPersons = ({persons}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
                {persons.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.phone}</td></tr>)}
            </tbody>
        </table>
    );
};

export default TableOfPersons;