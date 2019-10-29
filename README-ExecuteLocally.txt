LOCAL EXECUTION
-----------------

Requires active Mongodb server and Redis (See config.js)

Execute npm istall in these directories:
* api/
* common/
* batch/

$ node api/app.js
Works with node v8 and node v10 (I have detected  problems with node v12 and swagger)

URL: http://<ip>:10010/index.html