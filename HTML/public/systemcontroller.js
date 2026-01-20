// Globales Array für alle eingegangenen Bestellungen
let submittedOrders = [];

let oderqueque = [];

if(submittedOrders[0] != '')
{
   import { SerialPort } from 'serialport';
   
   const port = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 115200});


    port.write("Hello from Node.js!\n", (err) => {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
      console.log('message written');
    });
}