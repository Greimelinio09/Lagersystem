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

app.post("/api/update", (req, res) => {
    const value = req.body.value;
    const name = req.body.name;
    const index = req.body.index;

    let data = JSON.parse(fs.readFileSync("public/data.json", "utf8"));
    data[index][name] = value;
    fs.writeFileSync("public/data.json", JSON.stringify(data, null, 2), "utf-8");
    
    res.json({success: true});
});

app.post("/api/submit-order", (req, res) => {
    try {
        const orderList = req.body;  // Array von bestellten Artikeln
        
        // Lese aktuelle data.json
        let data = JSON.parse(fs.readFileSync("public/data.json", "utf8"));
        
        // Für jeden bestellten Artikel die Menge reduzieren
        orderList.forEach(orderItem => {
            const productName = orderItem.product.Name;
            const orderedQuantity = parseInt(orderItem.quantity);
            
            // Finde das Produkt in der data.json
            const productIndex = data.findIndex(item => item.Name === productName);
            
            if(productIndex !== -1) {
                // Reduziere die Pieces um die bestellte Menge
                data[productIndex].Pieces -= orderedQuantity;
                //console.log(`Produkt "${productName}" reduziert von ${data[productIndex].Pieces + orderedQuantity} auf ${data[productIndex].Pieces}`);
            }
        });
        
        // Speichere die aktualisierte data.json
        fs.writeFileSync("public/data.json", JSON.stringify(data, null, 2), "utf-8");
        
        res.json({success: true, message: "Bestellung erfolgreich verarbeitet!"});
    } catch(error) {
        console.error("Fehler beim Verarbeiten der Bestellung:", error);
        res.status(500).json({success: false, message: "Fehler beim Verarbeiten der Bestellung"});
    }
});

app.listen(3000, () => {console.log("Server running on port 3000")});