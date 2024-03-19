const PersonData = ({person}) => {
    return (
        <tr><td>{person.name}</td><td>{person.number}</td></tr>
    );
};

export default PersonData;