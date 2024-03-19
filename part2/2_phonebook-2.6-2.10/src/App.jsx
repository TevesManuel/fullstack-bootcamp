import { useState } from 'react'
import Form from "./components/Form"
import TableOfPersons from "./components/TableOfPersons"
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  return (
    <div>
      <h2>Phonebook</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <TableOfPersons persons={persons} />
    </div>
  )
}

export default App