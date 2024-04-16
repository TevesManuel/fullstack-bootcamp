import { toast } from 'react-toastify';
import config from './config';

const manageToasts = (toastMessage) =>
{
    if(toastMessage)
    {
        switch (toastMessage.type)
        {
        case 'ok':
            toast.success(toastMessage.message, config.NOTIFICATION_CONFIG);
            break;
        case 'err':
            toast.error(toastMessage.message, config.NOTIFICATION_CONFIG);
            break;
        case 'normal':
            toast.info(toastMessage.message, config.NOTIFICATION_CONFIG);
            break;
        }
    }
};

export default manageToasts;