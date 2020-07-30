import { login } from "./api/login.service";
import { httpClientService } from "./api/http-client.service";

const readCredentials = () => {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	return {
		username,
		password,
	};
};

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("login").addEventListener("click", (event) => {
		event.preventDefault();
		event.stopPropagation();
		const credentials = readCredentials();
		login(credentials)
			.then((data) => {
				//console.log(data);
				const { access_token } = data;
				const headers = {
					Authorization: `Bearer ${access_token}`,
				};
				httpClientService.setHeaders(headers);
				access_token
					? window.location.replace(
							`http://localhost:1234/src/pages/cars.html?token=${access_token}`
					  )
					: null;
			})
			.catch((err) => console.log(err));
	});
});
