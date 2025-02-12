const axios = require("axios");
require("dotenv").config();

const KEY = process.env.KEY;

// // ! getting propertes of dataInput that I use them here
// const forcast = ({ latitute, longitute } = dataInput, callback) => {
const forcast = (latitute, longitute, callback) => {
	const weatherURL = "https://api.weatherapi.com/v1/current.json";
	axios
		.get(weatherURL, {
			params: {
				key: KEY,
				q: `${encodeURIComponent(latitute)}, ${encodeURIComponent(longitute)}`,
			},
		})
		.then(function ({ data } = response) {
			// console.log(data);

			// Validate response structure
			if (!data?.current || !data?.location) {
				throw new Error("Invalid response from weather service.");
			}
			//! Object Destructuring - before passing down the "display_name"
			// extract properties (current and location) from the response.data object.
			// and assigne them to "data" and "location"
			const { current, location } = data;
			const { temp_c, feelslike_c, condition, cloud } = current;
			const { name, region, country } = location;
			const locationDetails = `${name} (${region}, ${country})`;

			callback(
				undefined,
				`It is currently ${temp_c} degrees out there in ${locationDetails}, and it feels like ${feelslike_c} degrees out. ` +
					` Weather condition is ${condition.text}.` +
					` The sky is ${cloud}% cloudy.`
			);
		})
		.catch(function (error) {
			const { response, message } = error;
			// Handles errors from the API
			if (response) {
				callback("Unable to find location.", undefined);
				// Handles validation errors
			} else if (message) {
				callback(message, undefined);
				// Handles connection or unexpected errors
			} else {
				callback("Unable to connect to the weather service!", undefined);
			}
		});
};

module.exports = forcast;
