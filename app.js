//* Main app.js (index file)

// REQUIREMENTS
/* #region   */

const express = require("express"); // express modules
const ejs = require("ejs"); // get ejs
const request = require("request"); // API get requests
/* #endregion */

// app declare and extras to read from a post request and use static files
const app = express();
app.set("view engine", "ejs"); // EJS Templating : Tells our app to use EJS as its view engine
app.use(express.static(__dirname + "/public")); // serves static files
app.use(express.urlencoded({ extended: true })); // body parser
// PAGES
/* #region */

// index page (home page) : get
app.get("/", (req, res) => {
    request("http://127.0.0.1:5000/", function (error, response, body) {
        if (error) console.log(error);
        else data = JSON.parse(body);
        console.log(data);
        res.render("index", {
            mru: data,
        });
    });
});

// LISTEN: BROWSER PORT
app.listen(process.env.PORT || 3000, () => {
    console.log("The server has started!");
});
/* #endregion */
