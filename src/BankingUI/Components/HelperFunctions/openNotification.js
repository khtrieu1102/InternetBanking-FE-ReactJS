import { notification } from "antd";

const openNotification = (message, description) => {
	notification.open({
		message: message,
		description: description,
		placement: "bottomRight",
	});
};

export default openNotification;
