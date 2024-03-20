import { useEffect, useState } from 'react'
import Form from "./components/Form"
import TableOfPersons from "./components/TableOfPersons"
import Filter from "./components/Filter"

import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([]);

  const fetchPersonsFromDB = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    })
  };

  useEffect(fetchPersonsFromDB, []);

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