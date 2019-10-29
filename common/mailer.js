"use strict";

var nodemailer = require('nodemailer');
const {mailer} = require("../config");

class Mailer{
  constructor(){}

  send(title,body){
    var transporter = nodemailer.createTransport(mailer.transport);
    var mailOptions = {
      from: mailer.from,
      to: mailer.to,
      subject: title,
      text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = Mailer;