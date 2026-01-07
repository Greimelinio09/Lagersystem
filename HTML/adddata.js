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

document.getElementById("submit").onclick = function(){
    Type = document.getElementById("type").value;
    Value = document.getElementById("value").value;    
    Name = document.getElementById("name").value;    
    Design = document.getElementById("design").value; 
    Pieces = document.getElementById("pieces").value;

    const item = {

        "Type": Type,
        "Value": Value,
        "Name": Name,
        "Design": Design,
        "Pieces": Pieces
    };
    
    
   
    
    item1.push(item);
    const json = JSON.stringify(item1, null, "\t");
    console.log(json);
    
}







/*
let username;

document.getElementById("mySubmit").onclick = function(){
    username = document.getElementById("myText").value;
    document.getElementById("myH1").textContent = `Hello ${username}`;

}*/