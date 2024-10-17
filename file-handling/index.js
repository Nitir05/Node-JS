const fs = require("fs");
const os = require("os");

// Synchronously write file (Blocking operation)
fs.writeFileSync("./test.txt", "Hello world!!");
console.log("File written synchronously.");

// Asynchronously write file (Non-blocking operation)
fs.writeFile("./test.txt", "Hello world asynchronously!", (err) => {
    if (err) {
        console.error("Error writing file asynchronously:", err);
    } else {
        console.log("File written asynchronously.");
    }
});

// Synchronously read file(Blocking operation)
const contacts = fs.readFileSync("./contacts.txt", { encoding: "utf-8" });
console.log(contacts);

// Asynchronously read file(Non-blocking operation)
fs.readFile("./contacts.txt", { encoding: "utf-8" }, (err, result) => {
    if (err) {
        console.error("Error reading file asynchronously:", err);
    } else {
        console.log(result);
    }
});

// Synchronously append to file (Blocking operation)
try {
    fs.appendFileSync("./test.txt", `\nThis is append file sync`, "utf8");
    console.log("Content appended to file synchronously.");
} catch (err) {
    console.error("Error appending to file:", err);
}

//Asynchronously append to file (Non-blocking operation)
fs.appendFile("./test.txt", `\nAppending asynchronously`, (err, result) => {
    console.log("File appended asynchronously");
});

//Copy file synchronously (Blocking operation)
fs.cpSync("./test.txt", "copy_text.txt");

//Default thread pool size: 4
//Max thread pool size: CPU cores (ex:8)

console.log(`My CPU has ${os.cpus().length} cores`);
