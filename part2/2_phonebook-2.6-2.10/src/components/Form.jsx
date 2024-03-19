import { useState } from 'react'

const Form = ({persons, setPersons}) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    
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
      setPersons(persons.concat({name : newName, phone: newPhone}));
      setNewName('');
      setNewPhone('');
    };

    return (
      <form onSubmit={addPhone}>
        <div>
        name: <input value={newName} onChange={handleInput(setNewName)}/>
        phone: <input value={newPhone} onChange={handleInput(setNewPhone)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export default Form;