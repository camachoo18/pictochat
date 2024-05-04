const fs = require("fs")
const path = require("path")
const dbpath = path.join(__dirname, "../db/mensajes.db")
const sqlite = require("better-sqlite3")
const db = new sqlite(dbpath)

function initDB(){
    const init = fs.readFileSync(path.join(__dirname, "../db/init.sql"), "utf8")
    const statements = init.split(";").filter( statement => statement.trim() !== "")
    statements.forEach(statement => {
        db.prepare(statement).run()
        //const row = db.prepare('SELECT * FROM mensajes').all();
        //console.log(row)
    })
}

function read(){
    return db.prepare("SELECT * FROM mensajes ORDER BY id DESC LIMIT 5 ").all()
    
}

function insertarMensaje(mensaje){
    db.prepare(`INSERT INTO mensajes (mensaje) VALUES (?)`).run(mensaje);
}



module.exports = {
    initDB,
    insertarMensaje,
    read
}