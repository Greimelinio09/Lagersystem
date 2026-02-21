window.submittedOrders = window.submittedOrders || [];



function sendusb(){
    console.log("testorder called");
    console.log(submittedOrders);
    fetch("/api/sendusb?message=" + JSON.stringify(submittedOrders))
    .then(response => response.json())
    .then(data => {
        console.log("Response from server:", data);
        // Handle the response data as needed
    })
    .catch(error => {
        console.error("Error sending data to server:", error);
    });
    

}

let leckmi = false;
function testorder1(){
   
    
    if(leckmi)
    {
        fetch("/api/sendusb?message=ON");
        leckmi = false;
    }
    else
    {
        fetch("/api/sendusb?message=OFF");
        leckmi = true;
    }



}