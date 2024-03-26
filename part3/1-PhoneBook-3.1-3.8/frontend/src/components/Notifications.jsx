const NOTIFICATION_TIME_MS = 5000;
const Notification = ({notificationObject}) => {
    let { title, message, className, setNotificationObject } = notificationObject;

    if(setNotificationObject != null)
    {
      setTimeout( () => {
        setNotificationObject({});
      }, NOTIFICATION_TIME_MS);
    }
    if (message === null) {
      return null
    }
  
    return (
      <div className={className}>
        <h1>{title}</h1>
        <h4>{message}</h4>
      </div>
    )
}
export default Notification;