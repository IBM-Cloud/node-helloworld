var express = require("express"),
    app = express();

var port = process.env.VCAP_APP_PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/hello", function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"})
    response.end("Hello World!\n");
});

app.listen(port);

require("cf-deployment-tracker-client").track();
