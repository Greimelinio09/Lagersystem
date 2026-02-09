window.submittedOrders = window.submittedOrders || [];

let testButton = false;

function testorder(){
    testButton = !testButton;
    console.log("Test Button State:", testButton);
    if(testButton){
        fetch("/api/sendusb?message=ON");
        
        
    }
    else{
        fetch("/api/sendusb?message=OFF");
    }

}