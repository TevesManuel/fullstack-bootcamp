import FlotantWindow from './FlotantWindow';

import { useState } from 'react';

const ConfirmWindow = ({ text }) => {
    const [view, setViewFn] = useState(true);
    return(
        <FlotantWindow setViewFn={setViewFn}>
            <p>{text}</p>
            <button>YES</button>
            <button>NO</button>
        </FlotantWindow>
    );
};

export default ConfirmWindow;