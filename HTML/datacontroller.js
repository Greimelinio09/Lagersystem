fetch("data.json")
.then(function(response){
    return response.json();



})

.then(function(products){

    let placeholder = document.querySelector("#data-output");

    let out = "";

    for(let product of products)
    {
        out += `
        
            <tr>

                <td ${product.Type}</td>
                <td>${product.Value}</td>
                <td>${product.Name}</td>
                <td>${product.Design}</td>
                <td>${product.Pieces}</td>
            </tr>

        `;


    }

    placeholder.innerHTML = out;

})



