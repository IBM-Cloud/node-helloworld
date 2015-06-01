var http = require("http"),
    pkg = require(path.join(__dirname, "package.json"));

module.exports = function (app) {
    var vcapApplication = process.env.VCAP_APPLICATION;
    if (vcapApplication) {
      var event = {
        date_sent: new Date().toJSON()
      };
      if (pkg.version) {
        event.code_version = pkg.version;
      }
      if (pkg.repository && pkg.repository.url) {
        event.repository_url = pkg.repository.url;
      }
      if (vcapApplication.application_name) {
        event.application_name = vcapApplication.application_name;
      }
      if (vcapApplication.space_id) {
        event.space_id = vcapApplication.space_id;
      }
      if (vcapApplication.application_version) {
        event.application_version = vcapApplication.application_version;
      }
      if (vcapApplication.application_uris) {
        event.application_uris = vcapApplication.application_uris;
      }
      http.post("http://deployment-tracker.mybluemix.net/", event);
    }
});
