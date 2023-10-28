import express from "express";
import cors from "cors";
import mysql from "mysql";
const app = express();
const port = process.env.PORT || 8000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// DATABASE CONNECTIONS
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'social_app'
})
// TEST DATABASE CONNECTIONS
dbConnection.connect((err) => {
    if (err)  return err;
    console.log("DATABASE CONNECTION SUCCESSFUL");
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})