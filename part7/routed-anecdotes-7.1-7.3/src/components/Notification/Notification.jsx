/* eslint-disable react/prop-types */
const Notification = ({ notification }) => {
    if(notification !== '')
    {
        return (
            <div style={{ 'border': '1px solid black' }}>{ notification }</div>
        );
    }
};

export default Notification;