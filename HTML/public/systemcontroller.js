window.submittedOrders = window.submittedOrders || [];

let keineahnung = false;

function testorder(){
    keineahnung = !keineahnung;
    console.log("Test Button State:", keineahnung);
    if(keineahnung){
        fetch("/api/sendusb?message=ON");
        
        
    }
    else{
        fetch("/api/sendusb?message=OFF");
    }

}