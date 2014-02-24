// Licensed under the Apache License. See footer for details.

// use node's http package
var http = require("http")

// read the `package.json` file for this package, so we can reference
// the name property later
var pkg = require("./package.json")

// check the PORT environment variable, use "3000" if not set
var portString = process.env.PORT || "3000"

// parse the PORT environment variable into an integer
var port = parseInt(portString, 10)

// if it wasn't a valid integer, exit with a message
if (isNaN(port)) {
    logError("the PORT environment variable isn't a valid number: '" + portString + "'")
}

// create the HTTP server
var server = http.createServer()

// when an HTTP request is sent, respond with the "Hello, World" text
server.on("request", onRequest)

// start the server, writing a message once it's actually started
server.listen(port, onListen)

// all done! server should start listening and responding to requests!

//------------------------------------------------------------------------------
// when a request is sent to the server, respond with "Hello World" text
//------------------------------------------------------------------------------
function onRequest(request, response) {
    log("request " + request.method + " " + request.url)

    response.writeHead(200, {"Content-Type": "text/plain"})
    response.end("Hello World\n")
}

//------------------------------------------------------------------------------
// when the server starts, log a message
//------------------------------------------------------------------------------
function onListen(request, response) {
    log("server starting on http://localhost:" + port)
}

//------------------------------------------------------------------------------
// log a message with a common prefix of the package name
//------------------------------------------------------------------------------
function log(message) {
    console.log(pkg.name + ": " + message)
}

//------------------------------------------------------------------------------
// log a message and then quit
//------------------------------------------------------------------------------
function logError(message) {
    log(message)
    process.exit(1)
}

//------------------------------------------------------------------------------
// Copyright 2014 Patrick Mueller
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
