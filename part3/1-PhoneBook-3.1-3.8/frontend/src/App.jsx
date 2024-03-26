import { useEffect, useState } from 'react';
import Form from "./components/Form";
import TableOfPersons from "./components/TableOfPersons";
import Filter from "./components/Filter";
import Notification from "./components/Notifications";

import axios from 'axios';

import personService from './services/Persons';

import "./style.css"

const App = () => {

  const [persons, setPersons] = useState([]);

  const fetchPersonsFromDB = () => {
    personService.getAll().then(persons => setPersons(persons));
  };

  useEffect(fetchPersonsFromDB, []);

  const [filter, setFilter] = useState('');
  const [notificationObject, setNotificationObject] = useState({})

  return (
    <div>
      <Notification notificationObject={notificationObject} />
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new</h2>
      <Form persons={persons} setPersons={setPersons} setNotificationObject={setNotificationObject}/>
      <h2>Numbers</h2>
      <TableOfPersons filter={filter} persons={persons} setPersons={setPersons} setNotificationObject={setNotificationObject}/>
    </div>
  )
}

export default App