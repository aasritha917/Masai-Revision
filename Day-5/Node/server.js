const express = require("express");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/process-file", async (req, res) => {
  const inputFile = path.join(__dirname, "input.csv");
  const outputFile = path.join(__dirname, "output.csv");

  try {
    const fileSize = fs.statSync(inputFile).size;
    let processedBytes = 0;

    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity
    });

    readStream.on("data", chunk => {
      processedBytes += chunk.length;
    });

    rl.on("line", line => {
      writeStream.write(line.toUpperCase() + "\n");
    });

    rl.on("close", () => {
      writeStream.end();
      res.json({
        message: "File processed successfully",
        progress: "100%"
      });
    });

    readStream.on("error", err => {
      res.status(500).json({ error: err.message });
    });

    writeStream.on("error", err => {
      res.status(500).json({ error: err.message });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
