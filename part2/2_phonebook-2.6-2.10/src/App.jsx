import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleInput = (callback) => {
    return (event) => {callback(event.target.value)}
  };

  const addPhone = (event) => {
    event.preventDefault();
    if( persons.filter( e => e.name == newName).length > 0 )
    {
      alert(`${newName} is already added to phonebook.`);
      return;
    }
    setPersons(persons.concat({name : newName}));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhone}>
        <div>
        name: <input value={newName} onChange={handleInputNewName(setNewName)}/>
        phone: <input value={newPhone} onChange={handleInputNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App