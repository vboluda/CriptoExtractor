"use strict";

var nodemailer = require('nodemailer');
const {mailer} = require("../config");
var _log=require("./wlogger");

class Mailer{
  constructor(){}

  send(body){
    var transporter = nodemailer.createTransport(mailer.transport);
    var mailOptions = {
      from: mailer.from,
      to: mailer.to,
      subject: mailer.title,
      text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        _log.error(error);
      } else {
        _log.info('Email sent: ' + info.response);
      }
    });
  }
}

module.exports = Mailer;