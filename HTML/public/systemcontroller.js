window.submittedOrders = window.submittedOrders || [];



/*function testorder1(){
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
*/
let leckmi = false;
function testorder(){
    leckmi = !leckmi;
    
    if(leckmi)
    {
        fetch("/api/sendusb?message=ON");
    }
    else
    {
        fetch("/api/sendusb?message=OFF");
    }



}