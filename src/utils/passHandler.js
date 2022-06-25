const bcrypt = require("bcrypt");

const hash = async(password) => {
    const hashedPassword = await bcrypt.hash(password, 8);
    return hashedPassword.toString();
};
const matchPassword = async(password, hashedPassword) => {
    const ismatch = await bcrypt.compare(password, hashedPassword);
    return ismatch;
};

module.exports = { hash, matchPassword };