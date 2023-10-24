const fs = require('fs');
const { exec } = require('child_process');

function copy(sourcePath, destinationPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destinationPath);
    readStream.pipe(writeStream);
}

const packageJson = JSON.parse(fs.readFileSync("./package.json", 'utf8'));

// env
const envPath = "./src/env.json";
const env = JSON.parse(fs.readFileSync(envPath, "utf8"));
env.version = packageJson.version;
fs.writeFileSync(envPath, JSON.stringify(env, null, 2), 'utf8');

exec(`tsc`, (error, stdout, stderr) => {
    if (error)
        throw error;

    // package.json
    packageJson.main = "index.js";
    fs.writeFileSync("./dist/package.json", JSON.stringify(packageJson, null, 2), "utf8");

    // LICENSE
    copy("./LICENSE", "./dist/LICENSE");
});