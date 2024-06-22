import { Bounce } from 'react-toastify';

const NOTIFICATION_TIME = 5000;
const NOTIFICATION_THEME = 'light';
const NOTIFICATION_POSITION = 'bottom-left';

const NOTIFICATION_CONFIG = {
    position: NOTIFICATION_POSITION,
    autoClose: NOTIFICATION_TIME,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: NOTIFICATION_THEME,
    transition: Bounce,
};

export default {
    NOTIFICATION_CONFIG,
};