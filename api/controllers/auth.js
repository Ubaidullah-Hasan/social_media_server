import { db } from "../connect.js";
import bcrypt from "bcrypt";



export const register = (req, res) => {
    // CHECK USER IF EXISTS
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists")

        // CREATE A NEW USER
        // Hash the password **********=> (use bcrypt package for password hashing)
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
        const username = req.body.username;
        const email = req.body.email;
        const name = req.body.name;
        const values = [username, email, hashedPassword, name];
        db.query(q, [values], (err, data) => {
            if (err) {
                console.log("failed auth register");
                return res.status(500).json(err)
            };
            return res.status(200).json("User has been created");
        })
    })

};



export const login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [username], (err, data) => {
        if (err) {
            console.log("failed auth login");
            return res.status(500).json(err);
        }
        if(data.length === 0) return res.status(404).json("User not found");
        console.log(data);
        const checkPassword = bcrypt.compareSync(password, data[0].password);
        if(!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: data[0].id }, 'secretkey');

        const {password, ...others} = data[0];

        res.cookie("accessToken", token,{
            httpOnly: true,
        }).status(200).json(others);
    })

}



export const logout = (req, res) => {

};