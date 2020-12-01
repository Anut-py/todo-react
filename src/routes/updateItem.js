const db = require("./sql/sqlite");

function updateItem(req, res) {
    db.run(
        `UPDATE todo_items SET done=${req.body.done ? 1 : 0} WHERE id=${req.body.id};`,
        (result, err) => {
            res.set("Content-Type", "application/json");
            if (err) res.status(500).end(JSON.stringify(err));
            else res.status(200).json(result);
        }
    );
}

module.exports = updateItem;
