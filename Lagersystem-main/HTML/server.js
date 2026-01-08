const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/save', (req, res)  =>  {
    //console.log(req.body);
    fs.writeFileSync('public/data.json', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.post("/api/delete", (req, res) => {
    const index = req.body.index;

    let data = JSON.parse(fs.readFileSync("public/data.json", "utf8"));

    data.splice(index, 1)

    fs.writeFileSync("public/data.json", JSON.stringify(data, null, 2), "utf-8");

    res.json({success: true});



});

app.listen(3000, () => {console.log("Server running on port 3000")});