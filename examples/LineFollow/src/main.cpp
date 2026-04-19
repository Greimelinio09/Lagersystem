#include <Wire.h>
#include <Arduino.h>

void setup() {
  Wire.begin();
  Serial.begin(115200);
  Serial.println("Scan...");
}

void loop() {
  byte error, address;
  int count = 0;

  for(address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if(error == 0) {
      Serial.print("Gefunden bei 0x");
      if(address < 16) Serial.print("0");
      Serial.println(address, HEX);
      count++;
    }
  }

  if(count == 0) Serial.println("Nichts gefunden");
  delay(5000);
}