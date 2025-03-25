# IoT-Based Gas & Temperature Monitoring System

A real-time monitoring system that uses ESP8266, DHT11 temperature/humidity sensor, and MQ-5 gas sensor to detect environmental conditions and potential gas leaks.

## Features

- Real-time temperature and humidity monitoring
- Gas leak detection with alert system
- Web dashboard for data visualization
- Firebase Realtime Database integration
- Automatic alerts when gas levels exceed safe thresholds

## Hardware Components

- NodeMCU ESP8266 WiFi module
- DHT11 Temperature and Humidity Sensor
- MQ-5 Gas Sensor
- Buzzer for local alerts
- Breadboard and connecting wires

## Software Stack

- Arduino IDE for ESP8266 programming
- Firebase Realtime Database
- HTML/CSS/JavaScript for web dashboard
- Chart.js for data visualization

## Setup Instructions

### Hardware Setup

1. Connect DHT11 sensor to NodeMCU D4 pin
2. Connect MQ-5 gas sensor to NodeMCU A0 pin
3. Connect buzzer to NodeMCU D3 pin
4. Power the NodeMCU via USB or external power supply

### Software Setup

1. Install required libraries in Arduino IDE:
   - ESP8266WiFi
   - FirebaseESP8266
   - DHT sensor library

2. Upload the Sketch.h code to your ESP8266

3. Open the web dashboard to view real-time data

## Web Dashboard

The web dashboard displays real-time data from the sensors and provides visual alerts when gas levels exceed safe thresholds.

To run the web dashboard locally:
1. Navigate to the `web` directory
2. Open `index.html` in a web browser

## Future Improvements

- Mobile app integration
- SMS/Email alerts
- Historical data analysis
- Machine learning for predictive maintenance
- Battery-powered operation for portable use

## License

MIT License

## Contributors

- Your Team Name