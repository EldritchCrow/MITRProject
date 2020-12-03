
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
    await conn.run("DELETE FROM recents WHERE event_id=?", id);
    await conn.run("INSERT INTO recents VALUES (?, ?)", id, parseInt(new Date() / 1000));
    var records = (await conn.get("SELECT COUNT(*) as c FROM recents")).c;
    if(records > 5)
        await conn.run("DELETE FROM recents WHERE timestamp=(SELECT MIN(timestamp) FROM recents)");
}

async function getRecents() {
    var conn = await getDBConn();
    return await conn.all("SELECT event_id FROM recents ORDER BY timestamp DESC LIMIT 5");
}

async function resetDB() {
    var conn = await getDBConn();
    conn.run('\
    DROP TABLE IF EXISTS recents;\
    DROP TABLE IF EXISTS loc_notes;\
    DROP TABLE IF EXISTS gen_notes;\
    \
    CREATE TABLE recents (event_id INT, timestamp INT);\
    CREATE TABLE loc_notes (event_id INT, notes TEXT);\
    CREATE TABLE gen_notes (event_id INT, notes TEXT);\
    ');
}

async function getLocationNotes(id) {
    var conn = await getDBConn();
    var v = await conn.get("SELECT notes FROM loc_notes WHERE event_id=?", id);
    if(v === undefined)
        v = "";
    else
        v = v.notes;
    return v;
}

async function getGeneralNotes(id) {
    var conn = await getDBConn();
    var v = await conn.get("SELECT notes FROM gen_notes WHERE event_id=?", id);
    if(v === undefined)
        v = "";
    else
        v = v.notes;
    return v;
}

async function updateLocationNotes(id, text) {
    var conn = await getDBConn();
    var curr = await conn.get("SELECT notes FROM loc_notes WHERE event_id=?", id);
    if(curr !== undefined) {
        await conn.run("UPDATE loc_notes SET notes=:text WHERE event_id=:id", {
            ":id": id,
            ":text": text
        });
        return;
    }
    await conn.run("INSERT INTO loc_notes VALUES (:id, :text);", {
        ":id": id,
        ":text": text
    });
    return;
}

async function updateGeneralNotes(id, text) {
    var conn = await getDBConn();
    var curr = await conn.get("SELECT notes FROM gen_notes WHERE event_id=?", id);
    if(curr !== undefined) {
        await conn.run("UPDATE gen_notes SET notes=:text WHERE event_id=:id", {
            ":id": id,
            ":text": text
        });
        return;
    }
    await conn.run("INSERT INTO gen_notes VALUES (:id, :text);", {
        ":id": id,
        ":text": text
    });
    return;
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
exports.getLocationNotes = getLocationNotes;
exports.getGeneralNotes = getGeneralNotes;
exports.updateLocationNotes = updateLocationNotes;
exports.updateGeneralNotes = updateGeneralNotes;


exports.userStmt = userStmt;
exports.userSelectStmt = userSelectStmt;