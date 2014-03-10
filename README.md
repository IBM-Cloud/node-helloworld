bluemix-hello-node
================================================================================

A "Hello World" server in node.js sample for Bluemix.

This repo contains a complete sample of a node.js program that you can deploy
on IBM's [BlueMix](https://ace.ng.bluemix.net/) PaaS, which is based on
the [Cloud Foundry open source project](http://cloudfoundry.org/).

Before jumping into the code, make sure you have an IBM ID, by
registering at the
[IBM ID registration](https://www.ibm.com/account/profile/us?page=reg)
page.  You will need the IBM ID to login to BlueMix from the command line.

You will also need to install the `cf` command-line tool, available
here:

* <https://github.com/cloudfoundry/cli/releases>

At the time of this writing, the most recent version is `cf v6.0.0`.



install the code for the sample program
--------------------------------------------------------------------------------

From a command/shell terminal
* `cd` into the parent directory you want to install the project in
* `git clone` the project into a child directory
* `cd` into that child directory
* run `npm install` to install dependencies

For example:

    $ cd Projects
    $ git clone https://hub.jazz.net/git/pmuellr/bluemix-hello-node

        ... git output here ...

    $ cd bluemix-hello-node

    $ npm install

        ... npm output here ...


run locally
--------------------------------------------------------------------------------

After installing, run the server using

    node server

This should print the following to the console.

    bluemix-hello-node: server starting on http://localhost:3000

If instead, you get something like the following, someone is already
using the default port of 3000:

    Server running at http://127.0.0.1:3000/

    events.js:72
        throw er; // Unhandled 'error' event
                  ^
    Error: listen EADDRINUSE
        at errnoException (net.js:901:11)
        at Server._listen2 (net.js:1039:14)
        at listen (net.js:1061:10)
        at Server.listen (net.js:1127:5)
        ...

To use a different port on Mac and Linux, set the PORT environment variable
and restart the node server

    PORT=3001 node server

On Windows, set the PORT environment variable and restart the node server

    set PORT=3001
    node server

Once the server is running, test it by visiting the following URL in your
browser:

    http://localhost:3000/any/url

You should see the same content in the browser for every URL, which will be

    Hello World

In the command/shell terminal, you will see the following output:

    bluemix-hello-node: server starting on http://localhost:3000
    bluemix-hello-node: request GET /any/url



logging into BlueMix
--------------------------------------------------------------------------------

Now that you have your IBM ID and the `cf` command-line tool (see above),
you can log into BlueMix and the deploy your app.

First you should tell the `cf` command which environment you want to operate
with, with the `cf api` command:

    cf api https://api.ng.bluemix.net

You should see the following output:

    Setting api endpoint to https://api.ng.bluemix.net...
    OK

    API endpoint: https://api.ng.bluemix.net (API version: 2.0.0)
    Not logged in. Use 'cf login' to log in.
    No org or space targeted, use 'cf target -o ORG -s SPACE'

Note that as long as you only ever interact with the BlueMix environment with the
`cf` command (and not any other CloudFoundry environments), you won't have to
run the `cf api` command again.

To login to BlueMix, use the following command:

    cf login

You will be prompted for your IBM ID userid and password, as in the following
example:

    $ cf login
    API endpoint: https://api.ng.bluemix.net

    Username> <my-IBM-ID>

    Password> <enter your password here>
    Authenticating...
    OK

You will then be prompted to select your 'org' and 'space', just select the defaults,
which should be your IBM ID userid and `dev`, respectively.

When complete, you should see the following:

    API endpoint: https://api.ng.bluemix.net (API version: 2.0.0)
    User:         <my-IBM-ID>
    Org:          <my-IBM-ID>
    Space:        dev



deploying to BlueMix
--------------------------------------------------------------------------------

You can deploy an application to BlueMix with the `cf push` command.

Before doing that, though, please read through the `manifest.yml` file, and
change the `host` value in that file to a unique name across BlueMix.  This
file is used by the `cf push` command for values relating to the app you are
pushing.

The `name` of the app is `bluemix-hello-node`, and is also specified in the
`manifest.yml` file. This is the name we will use to reference the app
in subsequent `cf` commands.  This name needs to be unique within your
BlueMix "org" and "space".  You are likely already running within your
org, so you will likely be able to use this name as-is.

For more information on organizations and spaces, see the Cloud Foundry docs:

* *[Organizations and Spaces](http://docs.cloudfoundry.com/docs/using/managing-apps/orgs-and-spaces.html)*

After changing the `manifest.yml` file's `host` value, you can use the following
command to have the application deployed to BlueMix:

    cf push

If you didn't change the `manifest.yml` file's `host` value, you may see the
following message:

    Creating route hello-jim.ng.bluemix.net...
    FAILED
    Server error, status code: 400, error code: 210003,
           message: The host is taken: hello-jim

In the examples below, let's say you changed the `host` value to `hello-bob`.

After running the `cf push` command above, you should see the following output:

    Creating app hello-bob in org <my-IBM-ID> / space dev as <my-IBM-ID>...
    OK

    Using route hello-bob.ng.bluemix.net
    Binding hello-bob.ng.bluemix.net to hello-bob...
    OK

    Uploading hello-bob...
    Uploading from: /Users/pmuellr/Projects/bluemix/bluemix-hello-node
    24.9K, 5 files
    OK

    Starting app hello-bob in org <my-IBM-ID> / space dev as <my-IBM-ID>...
    OK
    -----> Downloaded app package (12K)
    -----> ibm-buildpack-nodejs 2013-01-16
    -----> Resolving engine versions
           WARNING: No version of Node.js specified in package.json, see:
           https://devcenter.heroku.com/articles/nodejs-versions
           Using Node.js version: 0.10.21
           Using npm version: 1.2.30
    -----> Fetching IBM SDK for Node.js binaries
    -----> Vendoring node into slug
    -----> Installing dependencies with npm
           npm WARN package.json bluemix-hello-node@ No repository field.
           npm http GET https://registry.npmjs.org/express
    ... remaining npm messages elided ...
    -----> Building runtime environment
    + '[' -e /tmp/staged/app/ACE_EMPTY_RUNTIME ']'
    + echo no
    + exit 1
    -----> Uploading droplet (23M)

    1 of 1 instances running

    App started

    Showing health and status for app hello-bob in org <my-IBM-ID> / space dev as <my-IBM-ID>...
    OK

    requested state: started
    instances: 1/1
    usage: 128M x 1 instances
    urls: hello-bob.ng.bluemix.net

         state     since                    cpu    memory         disk
    #0   running   2014-02-24 11:01:17 AM   0.0%   6.6M of 128M   34.1M of 1G

At this point, your application is running and you can visit it on the urls

    http://hello-bob.ng.bluemix.net
    https://hello-bob.ng.bluemix.net

If you'd like to continue to play with the server by changing the code, use
the following command when you are ready to push the new version to BlueMix:

    cf push hello-bob

You can stop the server at any time, by using the following command:

    cf stop hello-bob

When you're ready to delete the server, use the following command:

    cf delete hello-bob

For more information on the basics of pushing apps, see the Cloud Foundry docs:

* *[Getting Started](http://docs.cloudfoundry.com/docs/dotcom/getting-started.html)*
* *[Key Facts About Application Deployment](http://docs.cloudfoundry.com/docs/using/deploying-apps/)*



files in this repository
--------------------------------------------------------------------------------

`server.js`

The server written with node.js.  This server was adapted from the
*[example provided in the node docs](http://nodejs.org/api/synopsis.html)*.

The difference is that the port to use is determined from the environment
variable `PORT`.  See the Cloud Foundry doc
*[Cloud Foundry Environment Variables](http://docs.cloudfoundry.com/docs/using/deploying-apps/environment-variable.html)*
for more information.

---

`.cfignore`

List of file patterns that should **NOT** be uploaded to BlueMix.

See the Cloud Foundry doc
*[Key Facts About Application Deployment](http://docs.cloudfoundry.com/docs/using/deploying-apps/)*
for more information.

In this case, the contents of the file are:

    node_modules

This indicates the node modules you installed with `npm install` will **NOT** be
uploaded to BlueMix.  When your app is "staged" (ie, built on BlueMix during
`cf push`), an
`npm install` will be run there to install the required modules.  By avoiding
sending your node modules when you push your app, your app will be uploaded
quicker than
if you **HAD** sent the modules.  But you can send the modules you have installed
if you like; just delete the `.cfignore` file.

---

`.gitignore`

List of file patterns that should **NOT** be stored in git.  If you aren't using
git, you don't need this file.  And the contents are personal preference.

See the npm google groups topic
*['node_modules in git' from FAQ](https://groups.google.com/forum/#!topic/npm-/8SRXhD6uMmk)*
for discussion.

---

`LICENSE`

The open source license for this sample; in this case, it's licensed under
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

---

`manifest.yml`

This file contains information that's used when you `cf push` the application.

You should edit this file and change the `host` value to a unique name across
BlueMix.

See the Cloud Foundry doc
*[Key Facts About Application Deployment](http://docs.cloudfoundry.com/docs/using/deploying-apps/)*
for more information.

---

`package.json`

Standard package.json file for node packages.  You will need this file for two
reasons:

* identify your node package dependencies during `npm install`
* identify to BlueMix that this directory contains a node.js application

See the npm doc
*[package.json](https://npmjs.org/doc/json.html)*
for more information.

---

`Procfile`

Used to indicate the command to start the server.

See the Cloud Foundry doc
*[Key Facts About Application Deployment](http://docs.cloudfoundry.com/docs/using/deploying-apps/)*
and the Heroku doc
*[Process Types and the Procfile](https://devcenter.heroku.com/articles/procfile)*
for more information.

In this case, the file has a single line:

    web: node server

This indicates that the command `node server` should be run when the app is
started.

---

`README.md`

This file!
