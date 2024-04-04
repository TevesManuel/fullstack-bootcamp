
const Filter = ({ filter, setFilter }) => {
    const onChangeFilter = (event) => {
        setFilter(event.target.value);
    };
    return (
        <div>
            <p>Filter shown with</p>
            <input value={filter} onChange={onChangeFilter}></input>
        </div>
    );
};

export default Filter;