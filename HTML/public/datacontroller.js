let wholejson = [];

    fetch("data.json")
    .then(res => res.json())
    .then(products => {
    wholejson = products; // Hier setzen
    let out = "";
    const currentPage = window.location.pathname.split("/").pop();

    // Der restliche Code bleibt gleich
});

let orderList = [];

document.addEventListener("DOMContentLoaded" , () => {
const currentPage = window.location.pathname.split("/").pop();

if(currentPage == "order.html"){
    writeOrderTable();
} else {
    fetch("data.json")
    .then(res => res.json())
    .then(products => {
        let out = "";
        if(currentPage == "index.html")
        {
            for(let i = 0; i < products.length; i++)
            {
                const product = products[i];
                console.log("Produkt:", product);
                out += `
                
                    <tr>

                        <td>${product.Type}</td>
                        <td>${product.Value}</td>
                        <td>${product.Name}</td>
                        <td>${product.Design}</td>
                        <td><input type="number" value="${product.Pieces}" oninput="updatejsonvalue(this.value, 'Pieces',${i})"></td>
                        <td><input type="number" value="${product.shelf}" oninput="updatejsonvalue(this.value, 'shelf',${i})"></td>
                        <td><input type="number" value="${product.box}" oninput="updatejsonvalue(this.value, 'box',${i})"></td>
                        <td><button onclick="deleteItem(${i})">Delete</button></td>
                        
                    </tr>

                `;


            }
        }
        else if(currentPage == "select.html")
        {  
            for(let i = 0; i < products.length; i++)
            {
                const product = products[i];
                console.log("Produkt:", product);
                out += `
                
                    <tr>
                        <td>${product.Type}</td>
                        <td>${product.Value}</td>
                        <td>${product.Name}</td>
                        <td>${product.Design}</td>
                        <td><input id="ordernumber-${i}" type="number" value="0"></td>
                        <td><button onclick="submitSelection(${i},document.getElementById('ordernumber-${i}'))">Add to Order</button></td>
                    </tr>

                `;


            }
        }
        document.getElementById("data-output").innerHTML = out;
        });
}


});

function deleteItem(index){
    console.log("Fetch läuft");
    fetch("/api/delete", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({index})
    })
    .then(() => location.reload());
}

function updatejsonvalue(value, name, index){
    console.log("Fetch läuft");
    fetch("/api/update", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({value, name, index})
    })
    .then(() => console.log("Updated"));
}

function searchFunction() {
    const input = document.getElementById("searchbar");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("data-output");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let tdArray = tr[i].getElementsByTagName("td");
        let found = false;

        for (let j = 0; j < tdArray.length; j++) {
            let td = tdArray[j];
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }   
}

function submitSelection(index, ordernumberElement) {
    const ordernumber = ordernumberElement.value; // Den Wert des Eingabefelds bekommen
    if(ordernumber <= 0) {
        alert("Bitte geben Sie eine gültige Menge ein!");
        return;
    }
    // Lade orderList aus localStorage
    const savedOrderList = localStorage.getItem("orderList");
    const currentOrderList = savedOrderList ? JSON.parse(savedOrderList) : [];
    
    currentOrderList.push({
        product: wholejson[index],   // Produkt aus wholejson basierend auf dem Index
        quantity: ordernumber       // Die Menge aus dem Eingabefeld
    });
    // Speichere orderList in localStorage für Persistierung
    localStorage.setItem("orderList", JSON.stringify(currentOrderList));
    console.log(currentOrderList);  // Zeigt die OrderList mit dem neuen Produkt an
    alert("Artikel zur Bestellung hinzugefügt!");
    // Zurücksetzen des Input-Feldes
    ordernumberElement.value = "0";
}






function writeOrderTable() {
    
    
    // Hole orderList aus localStorage
    const savedOrderList = localStorage.getItem("orderList");
    const displayOrderList = savedOrderList ? JSON.parse(savedOrderList) : orderList;
    
    console.log("OrderList:", displayOrderList);

    let out = "";
    for (let i = 0; i < displayOrderList.length; i++) {
        const orderItem = displayOrderList[i];
        out += `
            <tr>
                <td>${orderItem.product.Type}</td>
                <td>${orderItem.product.Value}</td>
                <td>${orderItem.product.Name}</td>
                <td>${orderItem.product.Design}</td>
                <td>${orderItem.quantity}</td>
                <td><button onclick="deleteOrderItem(${i})">Löschen</button></td>
            </tr>
        `;
    }
    document.getElementById("data-output").innerHTML = out;    
}

function deleteOrderItem(index) {
    const savedOrderList = localStorage.getItem("orderList");
    const currentOrderList = savedOrderList ? JSON.parse(savedOrderList) : [];
    
    // Entferne das Item bei Index
    currentOrderList.splice(index, 1);
    
    // Speichere updated Liste
    localStorage.setItem("orderList", JSON.stringify(currentOrderList));
    
    // Tabelle aktualisieren
    writeOrderTable();
}

function ordercomponents() {
    // Hole orderList aus localStorage
    const savedOrderList = localStorage.getItem("orderList");
    const orderList = savedOrderList ? JSON.parse(savedOrderList) : [];
    
    if(orderList.length === 0) {
        alert("Keine Artikel in der Bestellung!");
        return;
    }
    
    // Füge zur globalen submittedOrders Liste hinzu
    submittedOrders.push({
        timestamp: new Date().toLocaleString(),
        items: orderList
    });
    
    // Zeige die georderten Komponenten in der Console
    console.log("=== SUBMIT ORDER ===");
    console.log("Georderte Komponenten:", orderList);
    console.log("Anzahl der Positionen:", orderList.length);
    console.log("Alle eingegangenen Bestellungen:", submittedOrders);
    console.log("====================");
    
    // Sende die Bestellung zum Server um data.json zu aktualisieren
    fetch('/api/submit-order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderList)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Bestellung erfolgreich eingereicht:", data);
        alert("Bestellung erfolgreich eingereicht!");
        
        // Leere orderList in localStorage
        localStorage.removeItem("orderList");
        
        // Leere die Tabelle
        writeOrderTable();
    })
    .catch(error => {
        console.error("Fehler beim Einreichen der Bestellung:", error);
        alert("Fehler beim Einreichen der Bestellung!");
    });
}