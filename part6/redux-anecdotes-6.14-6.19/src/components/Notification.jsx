import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification.text);
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    };
    if(notification)
    {
        return (
            <div style={style}>
                {notification}
            </div>
        );
    }
};

export default Notification;