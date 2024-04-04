const PersonData = ({ person, deleteCallback }) => {
    return (
        <tbody><tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={deleteCallback}>Delete</button></td></tr></tbody>
    );
};

export default PersonData;