import { useState } from 'react'

import personService from './../services/Persons'

const Form = ({ persons, setPersons, setNotificationObject }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    //A function that returns a function
    const handleInput = (callback) => {
      return (event) => {callback(event.target.value)}
    };
  
    const addPhone = (event) => {
      event.preventDefault();

      if(newName == '' || newNumber == '')
      {
        alert("[!] You need specify a name and number.");
        return;
      }

      let person_ref = persons.find( e => e.name == newName);
      if( person_ref != null )
      {
        personService.update(person_ref.id, {...person_ref, number: newNumber})
        .then(new_person => {
          setPersons(persons.map(person => person.name !== newName ? person : new_person));
          setNotificationObject({
            title: 'Phone updated successfully',
            message: `${person_ref.name} phone number was updated successfully.`,
            className: 'OKNotification',
            setNotificationObject,
          });
        })
        .catch(() => setNotificationObject(
          {
              title: "Error update phone",
              message: `${person_ref.name} phone is not saved in the db.`,
              className: 'ErrNotification',
              setNotificationObject
          }
        ));
      }
      else 
      {
        personService.create({name : newName, number: newNumber}).then(new_person => setPersons(persons.concat(new_person)));
        setNotificationObject({
          title: 'Phone added successfully',
          message: `${newName} phone number was added successfully.`,
          className: 'OKNotification',
          setNotificationObject,
        });
      }     

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