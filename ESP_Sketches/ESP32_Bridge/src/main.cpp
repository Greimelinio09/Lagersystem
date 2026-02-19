#include <Arduino.h>
#include <ArduinoJson.h>
#include <EEPROM.h>

#define LED_PIN 2

void writeString(String str, int address);
String readString(int address);


void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  delay(1000); // Wait for Serial to initialize
  String readedString = readString(0);
  Serial.print("Read from EEPROM: ");
  Serial.println(readedString);
}

void loop() {
  if(Serial.available() > 0) {
    String input = Serial.readStringUntil('\n');
    writeString(input, 0);
  }
    
  /*  
    if(input == "OFF")
      {
        digitalWrite(LED_PIN, LOW);
      }
    else if(input == "ON")
      {
        digitalWrite(LED_PIN, HIGH);
      }
  }
   */ 
}

void writeString(String str, int address) {
  for (size_t i = 0; i < str.length(); i++) {
    EEPROM.write(address + i, str[i]);
  }
  EEPROM.write(address + str.length(), '\0'); // Null-terminate the string
  EEPROM.commit(); // Ensure data is written to EEPROM
}

String readString(int address) {
  String result = "";
  char ch;
  while ((ch = EEPROM.read(address++)) != '\0') { // Read until null terminator
    result += ch;
  }
  Serial.println(result);
  return result;
}