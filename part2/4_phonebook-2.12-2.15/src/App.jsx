import { useEffect, useState } from 'react'
import Form from "./components/Form"
import TableOfPersons from "./components/TableOfPersons"
import Filter from "./components/Filter"

import axios from 'axios'

import personService from './services/Persons';

const App = () => {

  const [persons, setPersons] = useState([]);

  const fetchPersonsFromDB = () => {
    personService.getAll().then(persons => setPersons(persons));
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