const FlotantWindowCloseButton = ({ setViewFn }) => {
    return () => {
        <button type='closeButton' className="flotantWindowCloseButton" onClick={(e) => { e.preventDefault();setViewFn(false); }}>x</button>
    };
};

export default FlotantWindowCloseButton;