import FlotantWindow from './FlotantWindow';

const ConfirmWindow = (props) => {
    if (props.view) {
        return (
            <FlotantWindow setViewFn={props.setViewFn}>
                <div
                    style={{
                        backgroundColor: 'white',
                        padding: '6%',
                        borderRadius: '10px',
                    }}
                >
                    <p>{props.children}</p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <button onClick={props.callback}>YES</button>
                        <button onClick={() => props.setViewFn(false)}>
                            NO
                        </button>
                    </div>
                </div>
            </FlotantWindow>
        );
    }
};

import PropTypes from 'prop-types';

ConfirmWindow.propTypes = {
    view: PropTypes.bool.isRequired,
    setViewFn: PropTypes.func,
};

export default ConfirmWindow;
