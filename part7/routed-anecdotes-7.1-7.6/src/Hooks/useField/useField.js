import { useState } from 'react';

const useField = (type, initalValue='') => {
    const [value, setValue] = useState(initalValue);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue(initalValue);
    };

    return {
        type,
        value,
        onChange,
        reset
    };
};

export default useField;