

let item1 = [];

    fetch('data.json').then(function(response){
        return response.json();
    }).then(function(itemfromdata){
        item1 = itemfromdata// console.log(itemfromdata);
    }).catch(function(error){
        console.error("Something went wrong with the transformation!");
        console.error(error);
    });

let Type;
let Value;
let Name;
let Design;
let Pieces;
let shelf;
let box;

document.getElementById("submit").onclick = function(){

    Type = document.getElementById("type").value;
    Value = document.getElementById("value").value;    
    Name = document.getElementById("name").value;    
    Design = document.getElementById("design").value; 
    Pieces = document.getElementById("pieces").value;
    shelf = document.getElementById("shelf").value;
    box = document.getElementById("box").value;


    const item = {

        "Type": Type,
        "Value": Value,
        "Name": Name,
        "Design": Design,
        "Pieces": Pieces,
        "shelf": shelf,
        "box": box

    };

    
   
    
    item1.push(item);
    //const json = JSON.stringify(item1, null, "\t");
    //console.log(json);
    sendjson();
    
    
}

function clearFields(){
    document.getElementById("type").value = '';
    document.getElementById("value").value = '';
    document.getElementById("name").value = '';
    document.getElementById("design").value = '';
    document.getElementById("pieces").value = '';
    document.getElementById("shelf").value = '';
    document.getElementById("box").value = '';
    
}

function sendjson(){

    fetch('/api/save',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(item1)
    });
    clearFields();



}



document.getElementById("delete").onclick = function(){

    item1 = '';
    sendjson();

}
/*
let username;

document.getElementById("mySubmit").onclick = function(){
    username = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${username}`;

}*/