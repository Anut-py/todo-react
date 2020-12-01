const db = require("./sql/sqlite");

function getItems(_req, res) {
    db.all("SELECT * FROM todo_items;", (err, rows) => {
        res.set("Content-Type", "application/json");
        if (err) res.status(500).end(JSON.stringify(err));
        else res.status(200).json(rows);
    });
}

module.exports = getItems;
