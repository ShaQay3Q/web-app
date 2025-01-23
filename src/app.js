// node core module
const path = require("node:path");

// npm mudule
const express = require("express"); // is actually a function as oppose to something like an dobject

// console.log(__dirname); // /~/NodeJS/node-cours/web-server/src
// console.log(__filename); // /~/NodeJS/node-cours/web-server/src/app.js

// store express app
const app = express(); // doesn't take any arguments => can configure the server with various methods on app
const publicDirPath = path.join(__dirname, "../public");

//! which templting engine to use => set handlebars =
app.set("view engine", "hbs"); // key, value

//! configure express to serve a specific directory
app.use(express.static(publicDirPath)); // a way of costumizing the server

//! remove - express loads the index.html as main entry point
app.get("", (req, res) => {
	res.render(
		"index", // index is matching up with the templete name in the views
		{
			// this, the second srgumrnt is an object passed to the homepage here, with dynamic data
			title: "Weather App",
			weather: "It is raining.",
		}
	);
});
// app.com

app.get("/about", (req, res) => {
	res.send("<h1>About<h1>");
});
// app.com/about

app.get("/help", (req, res) => {
	res.send("Help Page");
});
// app.com/help

app.get("/contact", (req, res) => {
	res.send("Contact Page");
});

app.get("/weather", (req, res) => {
	res.send({
		forcast: "It is cold!",
		location: "Leipzig",
	});
});

//! start the server
app.listen(3000, () => {
	console.log("Server is up on port 3000");
}); //listen to specific port
