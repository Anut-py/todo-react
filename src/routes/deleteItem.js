const db = require("./sql/sqlite");

function deleteItem(req, res) {
    db.run(
        `DELETE FROM todo_items WHERE id=${req.body.id};`,
        (result, err) => {
            res.set("Content-Type", "application/json");
            if (err) res.status(500).end(JSON.stringify(err));
            else res.status(200).json(result);
        }
    );
}

module.exports = deleteItem;
