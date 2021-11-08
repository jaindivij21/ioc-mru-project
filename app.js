//* Main app.js (index file)

// REQUIREMENTS
/* #region   */
const express = require("express"); // express modules
const ejs = require("ejs"); // get ejs
const request = require("request"); // API get requests
const multer = require("multer"); // file uploads
/* #endregion */

// app declare and extras to read from a post request and use static files
const app = express();
app.set("view engine", "ejs"); // EJS Templating : Tells our app to use EJS as its view engine
app.use(express.static(__dirname + "/public")); // serves static files
app.use(express.urlencoded({ extended: true })); // body parser
// PAGES
/* #region */

// Middleware to upload files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/assets/");
    },
    filename: (req, file, cb) => {
        cb(null, "main.txt");
    },
});

const upload = multer({ storage: fileStorageEngine });

// index page (home page) : get
app.get("/", (req, res) => {
    res.render("upload");
});

app.post("/", upload.single("file"), (req, res) => {
    console.log(req.file);
    res.redirect("/mru");
});

app.get("/mru", (req, res) => {
    request("http://localhost:5000/", function (error, response, body) {
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
