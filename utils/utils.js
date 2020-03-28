module.exports.getNewId = data => {
  if (data && data.length) {
    data.sort((a, b) => b.id - a.id);
    return data[0].id + 1;
  }
  return 1;
};

module.exports.checkEmail = (users, email) => {
  return users.find(item => item.email === email);
};

module.exports.checkUsername = (users, username) => {
  return users.find(item => item.username === username);
};

module.exports.checkTruckName = (trucks, name) => {
  return trucks.find(item => item.name === name);
};
