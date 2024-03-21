const Filter = ({filter, setFilter}) => {
    const handleForFilterInput = (event) => {
        setFilter(event.target.value);
    };
  
    return (
        <input value={filter} onChange={handleForFilterInput}/>
    );
};

export default Filter;