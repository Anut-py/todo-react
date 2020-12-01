const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");

const getItems = require("./routes/getItems");
const addItem = require("./routes/addItem");
const updateItem = require("./routes/updateItem");
const deleteItem = require("./routes/deleteItem");

const db = require("./routes/sql/sqlite");

const app = express();

app.use(express.json());
app.use(favicon(path.join(__dirname, "public", "images", "favicon.png")));

app.get("/getItems", getItems);
app.post("/addItem", addItem);
app.put("/updateItem", updateItem);
app.delete("/deleteItem", deleteItem);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => {
    console.log("App listening on port 3000");
});

const shutdown = () => {
    server.close(() => {
        console.log("Successfully ended web server.");
    });
    db.close((err) => {
        if (err) throw err;
        else console.log("Successfully closed database connection.");
    });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGUSR2", shutdown);
