import { useState } from 'react'

import personService from './../services/Persons'

const Form = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    //A function that returns a function
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
      
      personService.create({name : newName, number: newNumber}).then(updated_persons => setPersons(persons.concat(updated_persons)));

      setNewName('');
      setNewNumber('');
    };

    return (
      <form onSubmit={addPhone}>
        <div>
        name: <input value={newName} onChange={handleInput(setNewName)}/>
        number: <input value={newNumber} onChange={handleInput(setNewNumber)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export default Form;