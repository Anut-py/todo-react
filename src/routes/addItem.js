const db = require("./sql/sqlite");

function addItem(req, res) {
    db.run(
        `INSERT INTO todo_items(name, done) VALUES ('${req.body.name}', ${
            req.body.done ? 1 : 0
        });`,
        (result, err) => {
            res.set("Content-Type", "application/json");
            if (err) res.status(500).json(err);
            else res.status(200).json(result);
        }
    );
}

module.exports = addItem;
