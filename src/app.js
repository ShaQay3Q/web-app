// node core module
const path = require("node:path");
const geocode = require("./utils/geocode");
const forcast = require("./utils/forcast");

// npm mudule
const express = require("express"); // is actually a function as oppose to something like an dobject
const hbs = require("hbs");
// console.log(__dirname); // /~/NodeJS/node-cours/web-server/src
// console.log(__filename); // /~/NodeJS/node-cours/web-server/src/app.js

// store express app
const app = express(); // doesn't take any arguments => can configure the server with various methods on app

// Define path for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); // for pages
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
//! which templting engine to use => set handlebars =
app.set("view engine", "hbs"); // key, value
app.set("views", viewsPath); // when views have another name, then we pass dir path as views value => view -> templates
hbs.registerPartials(partialsPath);

// Setup static directory to serve
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
			name: "Shaghayegh",
			links: [
				{ name: "Home", url: "/", active: true },
				{ name: "About", url: "/about", active: false },
				{ name: "Help", url: "/help", active: false },
			],
		}
	);
});
// app.com

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Page",
		who: "Vivi",
		name: "Shaghayegh",
		links: [
			{ name: "Home", url: "/", active: true },
			{ name: "About", url: "/about", active: false },
			{ name: "Help", url: "/help", active: false },
		],
	});
});
// app.com/about

app.get("/help", (req, res) => {
	res.render("help", {
		title: "Help!",
		text: "Help! Help! Help!",
		name: "Shaghayegh",
		links: [
			{ name: "Home", url: "/", active: true },
			{ name: "About", url: "/about", active: false },
			{ name: "Help", url: "/help", active: false },
		],
	});
});
// app.com/help

app.get("/help/me", (req, res) => {
	res.render("me", {
		title: "Me!",
		text: "This is about me!",
		name: "Shaghayegh",
	});
	// res.send("help me!");
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		title: "404!",
		textMessage: "Help article not found!",
		name: "Shaghayegh",
	});
});

app.get("/contact", (req, res) => {
	res.send("Contact Page");
});

app.get("/weather", (req, res) => {
	const address = req.query.city;
	debugger;
	if (!address) {
		return res.send({
			error: "You must provide a city name",
		});
	}

	// {} act as default value when data doesnt contain latitute, langitute and location
	geocode(address, (error, { latitute, longitute, location } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}

		// destructure the data when it exists
		// const { latitute, longitute, location } = data;

		forcast(latitute, longitute, (error, forcastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forcast: forcastData,
				location,
				address,
			});
		});
	});
});

app.get("/products", (req, res) => {
	const search = req.query.search;
	if (!search) {
		return res.send({
			error: "You must provide a search term",
		});
	}
	res.send({
		products: [],
	});
});

// for handling 404 errors
app.get("*", (req, res) => {
	res.render("404", {
		title: "404!",
		textMessage: "Page not found!",
		name: "Shaghayegh",
	});
});

//! start the server
app.listen(3000, () => {
	console.log("Server is up on port 3000");
}); //listen to specific port

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
