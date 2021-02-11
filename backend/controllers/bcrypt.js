const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(plainPassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log(hashedPassword);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
}

async function checkPassword(password, hashedPassword) {
  try {
    const match = bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { hashPassword, checkPassword };
