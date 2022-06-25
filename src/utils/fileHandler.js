const fs = require("fs");

const writeFile = (content, fileName) => {
    let data = content.toString().split("\n"); // stringify
    const newData = data.slice(3, -2).join("");
    fs.writeFileSync(fileName, newData);
};

module.exports = writeFile;