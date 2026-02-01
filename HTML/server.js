const express = require("express");
const fs = require("fs");
const { SerialPort } = require('serialport');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Finde verfügbare Serial Ports
SerialPort.list().then(ports => {
    const usbPorts = ports.filter(port => port.path.includes('USB'));
    if (usbPorts.length > 0) {
        const portPath = usbPorts[0].path;
        console.log('Verfügbare USB-Ports:', usbPorts.map(p => p.path));
        console.log('Verwende Port:', portPath);
        
        const port = new SerialPort({
            path: portPath,
            baudRate: 115200
        });

        port.on('open', () => {
            console.log('Serial port opened');
        });

        port.on('error', (err) => {
            console.error('Serial port error:', err.message);
        });

        // Mache port global verfügbar
        global.serialPort = port;
    } else {
        console.warn('Keine USB-Serial-Ports gefunden. ESP32 nicht angeschlossen?');
    }
}).catch(err => {
    console.error('Fehler beim Auflisten der Serial-Ports:', err);
});

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
        
        // Sende Bestellung über USB an ESP32
        if (global.serialPort && global.serialPort.isOpen) {
            const orderData = JSON.stringify(orderList);
            global.serialPort.write(orderData + '\n', (err) => {
                if (err) {
                    console.error('Error writing to serial port:', err.message);
                } else {
                    console.log('Bestellung an ESP32 gesendet:', orderData);
                }
            });
        } else {
            console.warn('Serial port is not open or not available, cannot send order to ESP32');
        }
        
        res.json({success: true, message: "Bestellung erfolgreich verarbeitet!"});
    } catch(error) {
        console.error("Fehler beim Verarbeiten der Bestellung:", error);
        res.status(500).json({success: false, message: "Fehler beim Verarbeiten der Bestellung"});
    }
});

app.listen(3000, () => {console.log("Server running on port 3000")});