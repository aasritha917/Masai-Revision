const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

class FileWatcher extends EventEmitter {
  constructor(dirPath) {
    super();
    this.dirPath = dirPath;
    this.files = new Set();

    // store initial files
    fs.readdirSync(dirPath).forEach(file => {
      this.files.add(file);
    });
  }

  start() {
    try {
      fs.watch(this.dirPath, (eventType, filename) => {
        if (!filename) return;

        const filePath = path.join(this.dirPath, filename);
        const time = new Date().toLocaleTimeString();

        fs.stat(filePath, (err) => {
          // file deleted
          if (err) {
            if (this.files.has(filename)) {
              this.files.delete(filename);
              this.emit("deleted", filename, time);
            }
            return;
          }

          // file added
          if (!this.files.has(filename)) {
            this.files.add(filename);
            this.emit("added", filename, time);
          } 
          // file modified
          else {
            this.emit("modified", filename, time);
          }
        });
      });
    } catch (error) {
      this.emit("error", error);
    }
  }
}

// ===== Usage =====

const watcher = new FileWatcher("./watch-folder");

watcher.on("added", (file, time) => {
  console.log(`[${time}] File Added: ${file}`);
});

watcher.on("modified", (file, time) => {
  console.log(`[${time}] File Modified: ${file}`);
});

watcher.on("deleted", (file, time) => {
  console.log(`[${time}] File Deleted: ${file}`);
});

watcher.on("error", (err) => {
  console.error("Watcher Error:", err.message);
});

watcher.start();
