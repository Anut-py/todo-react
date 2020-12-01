const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./todo.db');
db.run('CREATE TABLE IF NOT EXISTS todo_items(id INTEGER PRIMARY KEY, name TEXT, done INT);');

module.exports = db;