// Licensed under the Apache License. See footer for details.

// Sometimes you want to see your environment variables.
// While perhaps you don't want to do this in product, great while developing.

// console.log("process.env: " + JSON.stringify(process.env, null, 4))

// use node's http package
var http = require("http")

// use the cfenv package
var cfenv = require("cfenv")

// use the express package
var express = require("express")

// read the `package.json` file for this package, so we can reference
// the name property later
var pkg = require("./package.json")

// get the core cfenv application environment
var appEnv = cfenv.getAppEnv()

// create the HTTP server
var server = http.createServer()

// create the express app
var app = express()

// have all requests handled by the onRequest function
app.all("*", onRequest)

// when an HTTP request is sent, respond with the "Hello, World" text
server.on("request", app)

// start the server, writing a message once it's actually started
server.listen(appEnv.port, appEnv.bind, onListen)

// all done! server should start listening and responding to requests!

//------------------------------------------------------------------------------
// when the server starts, log a message
//------------------------------------------------------------------------------
function onListen(request, response) {
    log("server starting on " + appEnv.url)
}

//------------------------------------------------------------------------------
// when a request is sent to the server, respond with "Hello World" text
//------------------------------------------------------------------------------
function onRequest(request, response) {
    log("request " + request.method + " " + request.url)

    response.writeHead(200, {"Content-Type": "text/plain"})
    response.end("Hello World!\n")
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
