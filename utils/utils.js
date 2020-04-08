const fs = require('fs');
const handlebars = require('handlebars');
const nodemailer = require('nodemailer');
const config = require('config');
const mailTypes = require('../config/email_types');

module.exports.checkEmail = (users, email) => {
  return users.find(item => item.email === email);
};

module.exports.checkUsername = (users, username) => {
  return users.find(item => item.username === username);
};

module.exports.checkTruckName = (trucks, name) => {
  return trucks.find(item => item.name === name);
};

module.exports.getNextLoadState = state => {
  switch (state) {
    case 'En route to pick up':
      return 'Arrived to pick up';
    case 'Arrived to pick up':
      return 'En route to delivery';
    case 'En route to delivery':
      return 'Arrived to delivery';
    default:
      return false;
  }
};

module.exports.make_template = (type, data) => {
  const templateFile = fs.readFileSync(mailTypes[type].path, 'utf8');
  const compiled = handlebars.compile(templateFile);
  return compiled(data, { allowedProtoProperties: true });
};

module.exports.send_mail = (type, data, to) => {
  const transporter = nodemailer.createTransport({
    host: config.emailhost,
    port: config.emailport,
    secure: config.emailsecure,
    auth: {
      user: config.emaillogin,
      pass: config.emailpass,
    },
  });

  const sender = transporter.sendMail({
    from: 'EPAMFreighter',
    to,
    subject: `[EPAMFreighter] ${mailTypes[type].subject}`,
    html: this.make_template(type, data),
  });
};
