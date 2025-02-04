console.log("this is coming from app.js file!");

fetch("http://localhost:3000/weather?city=")
	.then((response) => {
		if (!response.ok) {
			throw new Error("HTTP error status: " + response.status);
		}
		return response.json();
	})
	.then((data) => {
		if (data.error) {
			throw new Error(data.error);
		}

		console.log("location: " + data.location);
		console.log("forcast: " + data.forcast);
	})
	.catch((error) => console.log(error));
