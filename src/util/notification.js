import PushNotification from "react-native-push-notification";

const showNotif = (title, message) => {
    PushNotification.localNotification({
        channelId: '1',
        title: title,
        message: message,
    });
}

const cancelAllNotif = () => {
    PushNotification.cancelAllLocalNotifications();
};

export { showNotif, cancelAllNotif };