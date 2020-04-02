const path = require('path');

module.exports = {
  register: {
    path: path.resolve(__dirname, 'templates/register.html'),
    subject: 'Your account has been registered!',
  },
  password_change: {
    path: path.resolve(__dirname, 'templates/password_change.html'),
    subject: 'Password has been changed',
  },
  load_assigned: {
    path: path.resolve(__dirname, 'templates/load_assigned.html'),
    subject: 'Truck has been found for your load',
  },
  load_state_change: {
    path: path.resolve(__dirname, 'templates/load_state_change.html'),
    subject: 'There is a progress in your load shipment',
  },
  load_shipped_driver: {
    path: path.resolve(__dirname, 'templates/load_shipped_driver.html'),
    subject: 'Thank you for finishing your shipping assignment!',
  },
  load_shipped_shipper: {
    path: path.resolve(__dirname, 'templates/load_shipped_shipper.html'),
    subject: 'Yay! Your load has been shipped!',
  },
};
