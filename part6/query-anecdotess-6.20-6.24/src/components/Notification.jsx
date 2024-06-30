import { useNotificationValue } from './../Context/Notification';

const Notification = () => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    };

    const notification = useNotificationValue();

    if(!notification.content)
        return null;
    return (
        <div style={style}>
            {notification.content}
        </div>
    );
};

export default Notification;
