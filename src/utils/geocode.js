const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

// const address = {
// 	city: city,
// 	postalcode: postalcode,
// 	state: state,
// 	country: country,
// };

const geocode = (city, callback) => {
	const geocodeURL = "https://geocode.maps.co/search?";

	axios
		.get(geocodeURL, {
			params: {
				city: encodeURIComponent(city), // in a case someone tried to enter problematic script!
				// postalcode: encodeURIComponent(postalcode),
				// state: "Saxony",
				// country: "Germany",
				api_key: API_KEY,
			},
		})
		.then(function ({ data } = response) {
			if (!data.length || !data[0] || typeof data[0] !== "object") {
				throw new Error("Invalid response structure from the API!");
			}

			const locationDetails = {
				latitute: data[0].lat,
				longitute: data[0].lon,
				location: data[0].display_name,
			};

			callback(
				undefined,
				({ latitute, longitute, location } = locationDetails)
			);
		})
		.catch(function (error) {
			const { response, message } = error;
			// Handles errors from the API
			if (response) {
				callback(
					"Unable to find the coordinates. Try another search!",
					undefined
				);
				// Handles validation errors
			} else if (message) {
				callback(message, undefined);
				// Handles connection or unexpected errors
			} else {
				callback("Unable to connect to location services!", undefined);
			}
		});
};

module.exports = geocode;
