const PersonData = ({person}) => {
    return (
        <tr><td>{person.name}</td><td>{person.phone}</td></tr>
    );
};

export default PersonData;