#include <Arduino.h>
#include <ArduinoJson.h>

#define LED_PIN 2

bool getSerialdata();
void ledTest(){
  digitalWrite(LED_PIN, !digitalRead(LED_PIN));
  delay(1000);
}

void blinkLED(int count) {
  for(int i = 0; i < count; i++) {
    digitalWrite(LED_PIN, HIGH);
    delay(200);
    digitalWrite(LED_PIN, LOW);
    delay(200);
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  
}

void loop() {
  bool ledState = getSerialdata();
  //ledTest();

}

bool getSerialdata() {
  if(Serial.available() > 0)
    {
      String input = Serial.readStringUntil('\n');
      // delay(10000); // Read input until newline character
      Serial.print("Received: ");
      Serial.println(input); // Echo the received input back to Serial Monitor
      
      if (input.length() > 0) {
        digitalWrite(LED_PIN, HIGH); // Turn LED on if data received
      }
      
      // Parse JSON
      JsonDocument doc;
      DeserializationError error = deserializeJson(doc, input);
      if (error) {
        Serial.print("JSON parse error: ");
        Serial.println(error.c_str());
        return false;
      }
      
      // Sum quantities
      int totalQuantity = 0;
      for(JsonObject item : doc.as<JsonArray>()) {
        totalQuantity += item["quantity"].as<int>();
      }
      
      Serial.print("Total quantity: ");
      Serial.println(totalQuantity);
      
      // Blink LED
      blinkLED(totalQuantity);
    }
  
  
  return false; // default return value if no complete string received
}