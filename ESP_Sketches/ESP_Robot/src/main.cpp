#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>

uint8_t broadcastAddress[] = {0x28, 0x05, 0xA5, 0x6F, 0x28, 0xAC};

typedef struct struct_message {
    String prductinarray[20];
    int productquantity[20];
    int numofproduct[20];
    int index;
} struct_message;

struct_message dataforRobot;

void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  char macStr[18];
  Serial.print("Last Packet Recv from: ");
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
  Serial.println(macStr);
  Serial.print("Data Length: ");
  Serial.println(len);
  struct_message myData;
  memcpy(&myData, incomingData, sizeof(myData));
  Serial.println("Data Received:");
  for(int i = 0; i < myData.index; i++) {
    Serial.print("Product: ");
    Serial.print(myData.prductinarray[i]);
    Serial.print(", Quantity: ");
    Serial.print(myData.productquantity[i]);
    Serial.print(", Num of Product: ");
    Serial.println(myData.numofproduct[i]);
  }
}

void setup() {
    Serial.begin(115200);
    WiFi.mode(WIFI_STA);
    if (esp_now_init() != ESP_OK) {
        Serial.println("Error initializing ESP-NOW");
        return;
    }
    esp_now_register_recv_cb(OnDataRecv);

    
  
}

void loop() {
  
}

