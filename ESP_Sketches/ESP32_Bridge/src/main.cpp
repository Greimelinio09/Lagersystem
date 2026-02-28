#include <Arduino.h>
#include <ArduinoJson.h>
#include <esp_now.h>
#include <WiFi.h>

const uint8_t output[] = {19,2,4,16,17};

uint8_t broadcastAddress[] = {0x28, 0x05, 0xA5, 0x6E, 0xB7, 0x78};

typedef struct struct_message {
    /*int quantity[10];
    int shelfnumber[10];
    int boxnumber[10];*/
    int numberofproducts;
} struct_message;

struct_message dataforRobot;
esp_now_peer_info_t peerInfo;

String products[20];


void senddatatorobot(int numofproducts, int quantity);
void examplesketch(String input);
int getquantitynum(String input);
int getnumofproducts(String input);
void gettheproducts(String input, int numofproducts);
void writeleds(int quantity);

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;
  peerInfo.encrypt = false;
  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Failed to add peer");
    return;
  }

  for(int i = 0; i < sizeof(output); i++)
    {
      pinMode(output[i],OUTPUT);
    }

  
}

void loop() {

  static String input;
  
  
  delay(1000);

  if(Serial.available() > 0) {
     input = Serial.readStringUntil('\n');
  }
  
  int numofproducts = getnumofproducts(input);
  gettheproducts(input,numofproducts);
  int quantity = getquantitynum(input);
  writeleds(numofproducts);
  Serial.println(products[4]);
  senddatatorobot(numofproducts, quantity);
  
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

int getnumofproducts(String input)
{
  int counter = 0;
  while(input.indexOf("quantity") != -1)
    {
      input.remove(input.indexOf("quantity"), 15);
      counter++;
    }
  return counter;
}

void gettheproducts(String input, int numofproducts)
{
  uint i = 0;

  while(input.indexOf("quantity") != -1)
    {
      uint start = input.indexOf("product") - 2;
      uint end = input.indexOf("quantity") + 15;

      products[i] = input.substring(start, end);
      input.remove(start, end - start);
      i++;
    }
      
}

void senddatatorobot(int numofproducts, int quantity)
{
  dataforRobot.numberofproducts = numofproducts;
  esp_now_send(broadcastAddress, (uint8_t *) &dataforRobot, sizeof(dataforRobot));
}