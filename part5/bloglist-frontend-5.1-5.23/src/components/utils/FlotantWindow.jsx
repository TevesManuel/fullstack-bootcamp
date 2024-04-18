import { useEffect, useRef } from 'react';

const FlotantWindow = (props) => {
    const flotantRef = useRef(null);

    const handleClickOutside = (event) => {
        console.log(flotantRef.current.contains(event.target));
        if (flotantRef.current && !flotantRef.current.contains(event.target))
        {
            if(props.setViewFn)
                props.setViewFn(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={flotantRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '99' }}>
            {props.children}
        </div>
    );
};

export default FlotantWindow;
