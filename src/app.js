const express = require("express"); // is actually a function as oppose to something like an dobject
// store express app
const app = express(); // doesn't take any arguments => can configure the server with various methods on app

app.get("/", (req, res) => {
	res.send("<h1>Hello Express!</h1>");
});
// app.com

app.get("/about", (req, res) => {
	res.send("<h1>About<h1></br>");
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
