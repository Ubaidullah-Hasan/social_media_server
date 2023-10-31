import mysql from "mysql";


// DATABASE CONNECTIONS
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'social_app'
})

// TEST DATABASE CONNECTIONS
db.connect((err) => {
    if (err) return err;
    console.log("DATABASE CONNECTION SUCCESSFUL");
});