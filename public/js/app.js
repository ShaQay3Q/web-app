console.log("this is coming from app.js file!");

const weatherForm = document.querySelector("form");
const cityName = weatherForm.querySelector("#city");
const displayMessage = document.querySelector(".display");
const displayForcast = document.querySelector(".how-forcast");

weatherForm.addEventListener("submit", (event) => {
	// prevent the eventListinner to rerender*refresh) the page
	event.preventDefault(); // Prevent form from reloading the page
	fetch(
		"http://localhost:3000/weather?city=" + encodeURIComponent(cityName.value)
	)
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

			console.log("location: " + data.location);
			console.log("forcast: " + data.forcast);
		})
		.catch((error) => console.log(error.message));
});
