
const fs = require("fs");

function hello() {
    console.log("trying to write to dummy2");
    console.log("wrote shit down at " + new Date() + "\n");
    fs.writeFileSync(path.join(__dirname, 'dummy2.txt'), "wrote shit down at " + new Date() + "\n");
    return {name: "I am dumb"};
}


exports.hello = hello;