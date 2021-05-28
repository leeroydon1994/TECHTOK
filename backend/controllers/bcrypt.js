const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(plainPassword) {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(err);
  }
}

async function checkPassword(password, hashedPassword) {
  try {
    const match = bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error(err);
  }
}

module.exports = { hashPassword, checkPassword };
