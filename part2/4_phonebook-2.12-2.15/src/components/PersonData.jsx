const PersonData = ({person, deleteCallback}) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={deleteCallback}>Delete</button></td></tr>
    );
};

export default PersonData;