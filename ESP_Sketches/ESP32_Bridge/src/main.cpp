#include <Arduino.h>

#define LED_PIN 2  // On-board LED pin for ESP32
#define TOUCH_PIN T0  // Touch pin T0 for ESP32

int threshold = 40;  // Touch threshold value

void setup() {
  Serial.begin(115200);
  Serial.println("ESP32 Bridge Initialized");
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  int touchValue = touchRead(TOUCH_PIN);
  Serial.print("Touch Value: ");
  Serial.println(touchValue);

  if (touchValue < threshold) {
    digitalWrite(LED_PIN, HIGH);  // Turn on LED
    Serial.println("LED ON");
  } else {
    digitalWrite(LED_PIN, LOW);   // Turn off LED
    Serial.println("LED OFF");
  }

  delay(500);  // Delay for readability



}