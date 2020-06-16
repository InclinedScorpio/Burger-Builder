import axios from "axios";

let instance = axios.create({
	baseURL: "https://tech-burger.firebaseio.com"
});

instance.interceptors.request.use(config => {
	return config;
});

instance.interceptors.response.use(config => {
	return config;
});

export default instance;
