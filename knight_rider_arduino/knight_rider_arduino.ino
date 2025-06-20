#include "LiquidCrystal_I2C.h"
LiquidCrystal_I2C lcd(0x27,16,2);

  const int numPin = 10;
  // pins connected to led on arduino
  int pin[numPin] = {4 , 5 , 6 , 7 , 8 , 9 , 10 ,11 ,12 ,13}; 


void setup() {
  for(int i = 0; i< numPin; i++){
    pinMode(i , OUTPUT);
  }

  Serial.begin(9600);
}



void loop() {
  int t = 50;
  int t2 = 200;

 // ********** Patern 0 Start: left to right and right to left ****************
  for(int i = 0; i<=10; i++){
    digitalWrite(pin[i], HIGH);
  delay(t);
    digitalWrite(pin[i+1] , HIGH);
    delay(t);
    digitalWrite(pin[i+2] , HIGH);
    delay(t);
    digitalWrite(pin[i-2] , LOW);
    delay(t);
    digitalWrite(pin[i-1] , LOW);
    delay(t);
    digitalWrite(pin[i] , LOW);
    delay(t);
  }

  for(int i = 9; i >= 0; i--){
    digitalWrite(pin[i] , HIGH);
    delay(t);
    digitalWrite(pin[i-1] , HIGH);
    delay(t);
    digitalWrite(pin[i-2] , HIGH);
    delay(t);
    digitalWrite(pin[i+2] , LOW);
    delay(t);
    digitalWrite(pin[i+1] , LOW);
    delay(t);
    digitalWrite(pin[i] , LOW);
    delay(t);
  }
 // ********** Patern 0 End: left to right and right to left ****************
  

 // ******* Patern 1 Start: Diverging from the middle then colapsing towards middle from the ends ***********
  int middlePin = numPin / 2;
  for(int i = 0; i<= middlePin; i++ ){

    digitalWrite(pin[middlePin + i], HIGH);
    digitalWrite(pin[middlePin - i], HIGH);

    delay(t2);

    digitalWrite(pin[middlePin + i] , LOW);
    digitalWrite(pin[middlePin - i] , LOW);


  }

   for(int i = middlePin; i>= 0; i-- ){

    
    digitalWrite(pin[middlePin + i], HIGH);
    digitalWrite(pin[middlePin - i], HIGH);

    delay(t2);

    digitalWrite(pin[middlePin + i] , LOW);
    digitalWrite(pin[middlePin - i] , LOW);


  }
 // ******* Patern 1 End: Diverging from the middle ***********

 // *********** Patern 2 Start: one led litting at a time and going till the right end and vise versa******************
  for(int i = 0; i<= 9; i++){
      
      digitalWrite(pin[i] , HIGH);
      // digitalWrite(pin[i+1] , HIGH);
      delay(t);

      digitalWrite(pin[i] , LOW);
      // digitalWrite(pin[i+1] , LOW);
      delay(t);

      
  }
  for(int i = 9; i>= 0; i--){
      
      digitalWrite(pin[i] , HIGH);
      // digitalWrite(pin[i-1] , HIGH);
      delay(t);

      digitalWrite(pin[i] , LOW);
      // digitalWrite(pin[i-1] , LOW);
      delay(t);

      
  }
 // *********** Patern 2 End: one led litting at a time and going till the right end and vise versa******************

};