console.log("this is coming from app.js file!");

// fetch("https://puzzle.mead.io/puzzle")
// 	.then((response) => {
// 		// when if blocks runs then the error will be thrown and the rest of the program won't be executes
// 		if (!response.ok) {
// 			throw new Error("HTTP error status: " + response.status);
// 		}
// 		// response.json() is a prommise => it should be resolved (in then block)
// 		return response.json();
// 	})
// 	.then((data) => {
// 		console.log("data: " + data.puzzle);
// 	})
// 	.catch((error) => console.log(error));

fetch("http://localhost:3000/weather?city=Leipzi")
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
