const express = require("express");
const fs = require("fs");
const { SerialPort } = require('serialport');
const app = express();

console.log("Diese Datei ist die server.js");

app.use(express.json());
app.use(express.static('public'));

const port = new SerialPort({
    path: '/dev/ttyUSB0', // Passe den Pfad zum seriellen Port an
    baudRate: 115200
}, (err) => {
    if (err) {
        return console.log('Error opening serial port: ', err.message);
    }
    console.log('Serial port opened successfully');
});


port.on('open', () => {
    console.log('Serial port is open');
});     



function sendMessagetoESP(message) {        
    port.write(message + "\n", (err) => {
        if (err) {
            console.error('Error writing to serial port:', err.message);
        } else {
            console.log('Message sent to ESP32:', message);
        }      
    });
}    

app.get('/api/sendusb', (req, res) => {
    const message = req.query.message || "Hello ESP32!";
    sendMessagetoESP(message);
    res.json({ success: true, message: `Message "${message}" sent to ESP32` });
});




app.post('/api/save', (req, res) => {
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
            const orderedQuantity = parseInt(orderItem.quantity);

            // Wenn der Client einen Index mitgeschickt hat, benutze ihn (eindeutig)
            let productIndex = typeof orderItem.productIndex !== 'undefined' ? parseInt(orderItem.productIndex) : -1;

            // Sonst versuche über den Namen zu matchen (Abwärtskompatibilität)
            if(productIndex === -1 && orderItem.product && orderItem.product.Name) {
                productIndex = data.findIndex(item => item.Name === orderItem.product.Name);
            }

            if(productIndex !== -1 && data[productIndex]) {
                // Stelle sicher, dass Pieces eine Zahl ist
                const currentPieces = parseInt(data[productIndex].Pieces) || 0;
                const newPieces = currentPieces - orderedQuantity;
                data[productIndex].Pieces = newPieces;
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

app.listen(3000, "0.0.0.0", () => {
    console.log("Server läuft auf Port 3000");
});