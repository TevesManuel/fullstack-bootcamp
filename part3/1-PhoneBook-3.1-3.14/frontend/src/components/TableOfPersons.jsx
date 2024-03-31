import PersonData from "./PersonData"

import personService from './../services/Persons';

const TableOfPersons = ({persons, filter, setPersons, setNotificationObject}) => {

    const callback_delete = (id) => {
        return () => {
            personService.remove(id)
            .then(() => setNotificationObject(
                {
                    title: "Removed phone correctly",
                    message: `${persons.find(person => person.id == id).name} phone is removed from the db.`,
                    className: 'OKNotification',
                    setNotificationObject
                }
            ))
            .catch(() => setNotificationObject(
                {
                    title: "Error removing phone",
                    message: `${persons.find(person => person.id == id).name} phone is not saved in the db.`,
                    className: 'ErrNotification',
                    setNotificationObject
                }
            ))
                .finally( () => setPersons(persons.filter(person => person.id != id)));
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                </tr>
            </thead>
            {persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())).map(person => <PersonData key={person._id} person={person} deleteCallback={callback_delete(person.id)}/>)}
        </table>
    );
};

export default TableOfPersons;