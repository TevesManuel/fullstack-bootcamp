import { useState } from 'react'
import Form from "./components/Form"
import TableOfPersons from "./components/TableOfPersons"
import Filter from "./components/Filter"

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',      phone: '040-1234567' },
    { name: 'Manuel Teves',     phone: '221-3058662' },
    { name: 'Luz Arancibia',    phone: '221-6160286' },
    { name: 'Luis Ferrari',     phone: '221-1723553' },
    { name: 'Manny Gutierres',  phone: '221-7654321' },
    { name: 'Nicolas Teves',    phone: '221-7235321' },
    { name: 'Nicolina Dangelo', phone: '221-7124321' },
    { name: 'Niccole Sambrano', phone: '221-5234221' },
  ]);

  const [filter, setFilter] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <TableOfPersons filter={filter} persons={persons} />
    </div>
  )
}

export default App