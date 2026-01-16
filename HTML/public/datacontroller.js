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
                <td>${product.Pieces}</td>
                <td>${product.shelf} </td>
                <td>${product.box} </td>
                <td><button onclick="deleteItem(${i})">Delete</button><td>
                
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


