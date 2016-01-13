# smartlaundry
## Get notifications of laundry status from "dumb" laundry machines

This ESP8266 project uses the Arduino IDE and excellent ESP8266 Arduino libraries to sense the status of standard washers and dryers.

The washer state is determined by sampling a single axis of an accelerometer and calculating the standard deviation on a collection of samples. Even using this method there is a lot of flapping of the state. Some additional debounce is probably needed.

Determining the dryer state is a bit more invasive - I replaced the dryer buzzer with a relay with a 120V coil. When the buzzer would have sounded, it closes the relay contacts and the ESP8266 reads it like a standard momentary button press.

The whole project is soldered to a small piece of perf board and mounted in a project box that is affixed to the back of the washer. I use a 1/8" jack and plug to connect to the contact leads from the relay so that the washer and dryer can be easily separated if required.

Additionally, I make use of the ESP8266 SPIFFS file system to host a simple web interface that shows device status and allows configuration of a few parameters.

As of this writing, the WiFi SSID and password must be manually injected into the code for the first run. I haven't added the code to go into AP mode when a configuration isn't found.

I also added a DS18B20 temperature sensor to the setup, as I already log temperatures around the house. The temperature can be easily read by visiting http://smartlaundry.local/temperature

Status changes are published to an MQTT broker. This is hardcoded for now, but will probably be configurable in the future.

I wrote a companion status menu app for OS X to subscribe to the MQTT channel and display system notifications, but you can use any MQTT subscriber system you like.
