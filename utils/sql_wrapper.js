
let sqlite3 = require("sqlite3");
let { open } = require("sqlite");

async function getDBConn() {
    return await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });
}

async function registerVisit(id) {
    var conn = await getDBConn();
    conn.run("INSERT INTO recents (?, ?)", [id, parseInt(new Date() / 1000)]);
    conn.run("DELETE FROM recents WHERE timestamp=MIN(timestamp)");
}

async function getRecents() {
    var conn = await getDBConn();
    return await conn.all("SELECT * FROM recents ORDER BY timestamp DESC");
}

async function resetDB() {
    var conn = await getDBConn();
    conn.run('\
    DROP TABLE IF EXISTS recents;\
    \
    \
    CREATE TABLE recents (event_id INT, timestamp INT); \
    ');
}

async function userStmt(stmt) {
    var conn = await getDBConn();
    conn.run(stmt);
}
async function userSelectStmt(stmt) {
    var conn = await getDBConn();
    return await conn.all(stmt);
}

exports.registerVisit = registerVisit;
exports.getRecents = getRecents;
exports.resetDB = resetDB;
exports.userStmt = userStmt;
exports.userSelectStmt = userSelectStmt;