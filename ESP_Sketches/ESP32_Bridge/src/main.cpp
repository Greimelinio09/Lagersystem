#include <Arduino.h>
#include <ArduinoJson.h>

#define LED_PIN 2

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  if(Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    if(input == "OFF")
      {
        digitalWrite(LED_PIN, LOW);
      }
    else if(input == "ON")
      {
        digitalWrite(LED_PIN, HIGH);
      }
  }
    
}