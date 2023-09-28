const express = require('express')
const mysql = require('mysql')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test"
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM test.books;"
    db.query(q, (err, data) => {
        if (err) console.log(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?,?,?,?)"
    const { title, desc, cover, price } = req.body

    db.query(q, [title, desc, cover, price], (err, data) => {
        if (err) console.log(err);
        res.json("data has been send!...")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("server is online!");
})