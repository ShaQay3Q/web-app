console.log("this is coming from app.js file!");

const weatherForm = document.querySelector("form");
const cityName = weatherForm.querySelector("#city");
const displayMessage = document.querySelector(".display");
const displayForcast = document.querySelector(".show-forcast");

// Construct the base URL dynamically
const baseURL = `${window.location.protocol}//${window.location.host}`;

console.log(baseURL);

weatherForm.reset();

weatherForm.addEventListener("submit", (event) => {
	// prevent the eventListinner to rerender*refresh) the page
	event.preventDefault(); // Prevent form from reloading the page
	console.log(cityName.value);

	fetch(baseURL + "/weather?city=" + encodeURIComponent(cityName.value))
		.then((response) => {
			if (!response.ok) {
				throw new Error("HTTP error! Status: " + response.status);
			}
			return response.json();
		})
		.then((data) => {
			if (data.error) {
				throw new Error(data.error);
			}

			const forcast = data.forcast?.toString();

			console.log("location: " + data.location);
			console.log("forcast: " + data.forcast);
			displayMessage.textContent = String(data.location);
			displayForcast.textContent = forcast;
			weatherForm.reset();
		})
		.catch((error) => {
			console.log(error.message);
			displayMessage.textContent = String(error.message);
		});
});
