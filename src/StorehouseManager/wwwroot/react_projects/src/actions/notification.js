/**
 * Created by kostya on 4/26/2017.
 */

import Notifications from 'react-notification-system-redux';

export function notificationFailure(errorObject) {
    const options = {
        title: 'Error',
        message: errorObject.message,
        position: 'tc',
        autoDismiss: 5,
    }
    return Notifications.error(options);
}