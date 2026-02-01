#include <Arduino.h>

#define LED_PIN 2

bool getSerialdata();
void ledTest(){
  digitalWrite(LED_PIN, !digitalRead(LED_PIN));
  delay(1000);
}

void setup() {
  Serial.begin(9600);
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  bool ledState = getSerialdata();
  //ledTest();

}

bool getSerialdata() {
  if(Serial.available() > 0)
    {
      String input = Serial.readStringUntil('\n'); // Read input until newline character
      Serial.print("Received: ");
      Serial.println(input); // Echo the received input back to Serial Monitor
    }
  
  
  return false; // default return value if no complete string received
}