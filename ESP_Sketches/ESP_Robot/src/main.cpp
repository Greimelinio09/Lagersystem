#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>

uint8_t broadcastAddress[] = {0xFF,0xFF,0xFF,0xFF,0xFF,0xFF};

typedef struct struct_message {
    int quantity[10];
    int shelfnumber[10];
    int boxnumber[10];
    int numberofproducts;
} struct_message;

struct_message dataforRobot;

void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
    memcpy(&dataforRobot, incomingData, sizeof(dataforRobot));
    Serial.println("Data received from robot:");
    Serial.print("Number of products: ");
    Serial.println(dataforRobot.numberofproducts);
    for (int i = 0; i < dataforRobot.numberofproducts; i++) {
        Serial.print("Product ");
        Serial.print(i + 1);
        Serial.print(": Quantity = ");
        Serial.print(dataforRobot.quantity[i]);
        Serial.print(", Shelf Number = ");
        Serial.print(dataforRobot.shelfnumber[i]);
        Serial.print(", Box Number = ");
        Serial.println(dataforRobot.boxnumber[i]);
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

