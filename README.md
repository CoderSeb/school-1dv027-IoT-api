# IoT API Project

Available here: https://terra-temp-api.herokuapp.com

## Routes

### GET /things
```json
[
    {
        "_id": "627bd20e89136cea2797394b",
        "name": "terra-temp-1",
        "description": "Terrarium temperature monitoring device",
        "microcontroller": "Arduino Nano 33 IoT",
        "sensors": [
            {
                "name": "sensor-1",
                "description": "Temperature sensor DS18B22",
                "influxField": "terraTemps/1",
                "thing_id": "627bd20e89136cea2797394b",
                "uniqueId": "627bd20e89136cea2797394b-sensor-1",
                "_id": "627bd20e89136cea2797394d"
            },
            {
                "name": "sensor-2",
                "description": "Temperature sensor DS18B22",
                "influxField": "terraTemps/2",
                "thing_id": "627bd20e89136cea2797394b",
                "uniqueId": "627bd20e89136cea2797394b-sensor-2",
                "_id": "627bd20e89136cea27973951"
            }
        ]
    }
]
```

### GET /things/terra-temp-1
```json
{
    "_id": "627bd20e89136cea2797394b",
    "name": "terra-temp-1",
    "description": "Terrarium temperature monitoring device",
    "microcontroller": "Arduino Nano 33 IoT",
    "sensors": [
        {
            "name": "sensor-1",
            "description": "Temperature sensor DS18B22",
            "influxField": "terraTemps/1",
            "thing_id": "627bd20e89136cea2797394b",
            "uniqueId": "627bd20e89136cea2797394b-sensor-1",
            "_id": "627bd20e89136cea2797394d"
        },
        {
            "name": "sensor-2",
            "description": "Temperature sensor DS18B22",
            "influxField": "terraTemps/2",
            "thing_id": "627bd20e89136cea2797394b",
            "uniqueId": "627bd20e89136cea2797394b-sensor-2",
            "_id": "627bd20e89136cea27973951"
        }
    ]
}
```

### GET /things/terra-temp-1/sensors
```json
[
    {
        "name": "sensor-1",
        "description": "Temperature sensor DS18B22",
        "influxField": "terraTemps/1"
    },
    {
        "name": "sensor-2",
        "description": "Temperature sensor DS18B22",
        "influxField": "terraTemps/2"
    }
]
```

### GET /things/terra-temp-1/sensors/sensor-2?since=2d&interval=1h
```json
{
    "name": "sensor-2",
    "description": "Temperature sensor DS18B22",
    "influxField": "terraTemps/2",
    "timeline": [
        {
            "time": "2022-05-22T08:00:00Z",
            "value": 28.6,
            "field": "terraTemps/2"
        },
        {
            "time": "2022-05-22T09:00:00Z",
            "value": 28.5,
            "field": "terraTemps/2"
        },...
    ]
}
```

### POST /things<br>
headers:<br>
x-iot-auth: **token**<br>
body:
```json
{
    "name": "terra-temp-1",
    "description": "Terrarium temperature monitoring device",
    "microcontroller": "Arduino Nano 33 IoT",
    "sensors": [
        {
            "name": "sensor-1",
            "description": "Temperature sensor DS18B22",
            "influxField": "terraTemps/1"
        },
        {
            "name": "sensor-2",
            "description": "Temperature sensor DS18B22",
            "influxField": "terraTemps/2"
        }
    ]
}
```
Response code: 201

### DELETE /things/terra-temp-1<br>
headers:<br>
x-iot-auth: **token**<br>
Response code: 204
