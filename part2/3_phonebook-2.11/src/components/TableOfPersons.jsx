import PersonData from "./PersonData"

const TableOfPersons = ({persons, filter}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
                {persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())).map(person => <PersonData key={person.id} person={person}/>)}
            </tbody>
        </table>
    );
};

export default TableOfPersons;