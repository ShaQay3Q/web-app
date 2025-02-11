const weatherForm = document.querySelector("form");
const cityName = weatherForm.querySelector("#city");
const displayMessage = document.querySelector(".display");
const displayForcast = document.querySelector(".show-forcast");

// Construct the base URL dynamically
// const baseURL = `${window.location.protocol}//${window.location.host}`;

weatherForm.reset();

weatherForm.addEventListener("submit", (event) => {
	// prevent the eventListinner to rerender*refresh) the page
	event.preventDefault(); // Prevent form from reloading the page
	displayForcast.textContent = "";
	displayMessage.textContent = "Loading...";

	fetch("/weather?city=" + encodeURIComponent(cityName.value))
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
			displayMessage.textContent = String(data.location);
			displayForcast.textContent = forcast;
			weatherForm.reset();
		})
		.catch((error) => {
			displayMessage.textContent = String(error.message);
		});
});
