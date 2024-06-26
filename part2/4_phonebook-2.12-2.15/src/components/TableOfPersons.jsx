import PersonData from "./PersonData"

import personService from './../services/Persons';

const TableOfPersons = ({persons, filter, setPersons}) => {

    const callback_delete = (id) => {
        return () => {
            personService.remove(id)
                .catch(() => alert(`[!] Phone with id ${id} is not saved in the server.`))
                .finally( () => setPersons(persons.filter(person => person.id != id)));
        }
    }

    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
                {persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())).map(person => <PersonData key={person.id} person={person} deleteCallback={callback_delete(person.id)}/>)}
            </tbody>
        </table>
    );
};

export default TableOfPersons;