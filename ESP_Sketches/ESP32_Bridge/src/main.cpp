#include <Arduino.h>
#include <ArduinoJson.h>

const uint8_t output[] = {19,2,4,16,17};


void examplesketch(String input);
int getquantitynum(String input);
void writeleds(int quantity);

void setup() {
  Serial.begin(115200);
  for(int i = 0; i < sizeof(output); i++)
    {
      pinMode(output[i],OUTPUT);
    }
}

void loop() {

  static String input;

  if(Serial.available() > 0) {
     input = Serial.readStringUntil('\n');
  } 

  int quantity = getquantitynum(input);
  writeleds(quantity);
  //examplesketch(input); 
   
}
    



void examplesketch(String input)
{
  if(input == "OFF")
      {
        digitalWrite(output[3], LOW);
      }
    else if(input == "ON")
      {
        digitalWrite(output[3], HIGH);
      }


}

int getquantitynum(String input)
{
  int start = input.indexOf("quantity");
  if(start != -1)
    {
      Serial.println(input[start+11]);
      return input[start + 11] - '0';
    }
  else
    {
      return 0;
    }
}

void writeleds(int quantity)
{
  for(int i = 0; i < 5; i++)
    {
      if(quantity == i+1)
        {
          digitalWrite(output[i],HIGH);
        }
      else
        {
          digitalWrite(output[i],LOW);
        }
    
      }


}