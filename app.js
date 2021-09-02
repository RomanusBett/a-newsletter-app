const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res) {
      const firstName = req.body.fName;
      const lastName = req.body.lName;
      const email = req.body.kEmail;
      const data = {
        members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }]
      }
      const jsonData = JSON.stringify(data);
      const url = "https://us5.api.mailchimp.com/3.0/lists/6a9598b073"
      const options = {
        method: "POST",
        auth: "Gooner:5b834985b7d105b41f3c28d9fd682e6a-us5"
      }
      const request = https.request(url, options, function(response) {
        if(response.error_count ===  0){
          res.sendFile(__dirname + "/success.html");
        } else{
          res.sendFile(__dirname + "/failure.html");
        }
          response.on("data", function(data){
              console.log(JSON.parse(data));
            })
          })
          request.write(jsonData);
          request.end();
      });
    app.post("/failure", function(req, res){
      res.redirect("/");
    })
    app.listen(process.env.PORT || 2000, function() {
      console.log("server is running on port 2000");
    });
// 5b834985b7d105b41f3c28d9fd682e6a-us5
