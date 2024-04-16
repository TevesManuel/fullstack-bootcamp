import { Bounce, toast } from 'react-toastify';
import config from './config';

const manageToasts = (toastMessage) =>
{
    if(toastMessage)
    {
        switch (toastMessage.type)
        {
        case 'ok':
            toast.success(toastMessage.message,  {
                position: 'bottom-right',
                autoClose: config.TIME_MS_ERROR_DISPLAY,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            break;
        case 'err':
            toast.error(toastMessage.message,  {
                position: 'bottom-right',
                autoClose: config.TIME_MS_ERROR_DISPLAY,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            break;
        case 'normal':
            toast.info(toastMessage.message,  {
                position: 'bottom-right',
                autoClose: config.TIME_MS_ERROR_DISPLAY,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
            });
            break;
        }
    }
};

export default manageToasts;