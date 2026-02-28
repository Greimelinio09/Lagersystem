#include <Arduino.h>
#include <esp_now.h>
#include <WiFi.h>

uint8_t broadcastAddress[] = {0x28, 0x05, 0xA5, 0x6F, 0x28, 0xAC};

typedef struct struct_message {
    /*int quantity[10];
    int shelfnumber[10];
    int boxnumber[10];*/
    int numberofproducts;
} struct_message;

struct_message dataforRobot;

void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
    memcpy(&dataforRobot, incomingData, sizeof(dataforRobot));
    Serial.print("Bytes received: ");
    Serial.println(len);
    Serial.print("Number of products: ");
    Serial.println(dataforRobot.numberofproducts);
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

