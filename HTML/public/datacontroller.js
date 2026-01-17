document.addEventListener("DOMContentLoaded" , () => {
fetch("data.json")
.then(res => res.json())
.then(products => {
    let out = "";
 



  

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
    
    document.getElementById("data-output").innerHTML = out;
    });

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
