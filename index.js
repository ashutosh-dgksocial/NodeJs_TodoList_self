const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

let newItems = []; //arr

app.get("/", (req, res) => {
    const date = new Date();
    const locale = "en-US";
    const dayName = date.toLocaleDateString(locale, { weekday: "long" });

    res.render("list", { MyDayVar: dayName, myItemArr: newItems });
});

app.post("/", (req, res) => {
    const userData = req.body.newItem;
    if (userData) {
        newItems.push(userData);
    }
    res.redirect('/');
});

app.post("/delete", (req, res) => {
    const indexToDelete = req.body.deleteId; // jab key ko access karegene to uski value apne aap access ho jayegi
    // key is the name = index but the value of index is 0 or the other index;
    // just like objects const body = {index:0} = body.index = 0;

    if (indexToDelete !== undefined) {
        newItems.splice(indexToDelete, 1);
    }
    console.log(indexToDelete, "= number");
    res.redirect('/');

});

app.listen(PORT, () => {
    console.log("Server is running at http://localhost:" + PORT);
});
