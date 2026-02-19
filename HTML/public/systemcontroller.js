window.submittedOrders = window.submittedOrders || [];



function testorder(){
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