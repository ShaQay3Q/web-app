console.log("this is coming from app.js file!");

fetch("https://puzzle.mead.io/puzzle").then((response) => {
	if (!response.ok) {
		throw new Error("HTTP error status: " + response.status);
	}
	// response.jason() is a prommise => it should be resolved
	response.json().then((data) => {
		console.log("data: " + data.puzzle);
		return data.puzzle;
	});
});
