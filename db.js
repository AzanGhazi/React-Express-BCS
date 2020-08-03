var sqlite3 = require('sqlite3').verbose()
const dbsrc = "db.sqlite"
let db = new sqlite3.Database(dbsrc, (err) => {
    if (err) {
      
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database. This is the Fixed Version')
        db.run("CREATE TABLE Message (message_data CHAR (200) PRIMARY KEY, message_type CHAR (10) NOT NULL);", (err)=> {if (err){ console.log("DB Already Exists");}});
        db.run('CREATE TABLE Step (step_id INTEGER PRIMARY KEY ,step_data CHAR (200) NOT NULL,message_data CHAR (200),  FOREIGN KEY (message_data) REFERENCES Message(message_data));', (err)=> {if (err){}});
            
    }});
    
module.exports = db
