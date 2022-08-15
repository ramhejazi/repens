# Repens
A simple terminal logger for node.
**repens** uses **chalk** library for colorifying log levels. 

## Installation 
> $ npm i repens

## Usage
The package exports an object. In order to create a logger one needs to call the `spawn` method of the exported object. 
The returned object of the `spawn` call also has the `spawn` method which can be used for creating child loggers, 
in other words, loggers can be created recursively.

``` javascript
const repens = require('./repens');
const app_logger = repens.spawn('app');
const db_logger = app_logger.spawn('db');

app_logger.info('app is running on port 5800');
// [05:41:35][app] app is running on port 5800
db_logger.warn('db is running on port 5801');
// [05:41:35][app][db] db on running in port 5801
```

## Loggers
All log methods accept n number of parameters. 
Parameters are joined with space.
The only difference between log levels is color. 

- **log**: no color
- **info**: cyan
- **warn**: yellow
- **error**: red
- **success**: green

## License
Licensed under MIT.


