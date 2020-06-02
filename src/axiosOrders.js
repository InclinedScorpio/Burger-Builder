import axios from "axios";

let instance = axios.create({
	baseURL: "https://tech-burger.firebaseio.com"
});

instance.interceptors.request.use(config => {
	console.log("Request going ::", config);
	return config;
});

instance.interceptors.response.use(config => {
	console.log("Response came ::", config);
	return config;
});

export default instance;
