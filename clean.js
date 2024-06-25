const fs = require("fs");
const glob = require("glob");

function cleanFiles(dir) {
  for (let file of glob.sync(dir)) {
    fs.readFile(file, "utf8", function (err, data) {
      if (data.length <= 1) {
        // console.log('Empty file removing: ', file)
        fs.unlink(file, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
    });
  }
}

cleanFiles("./assets/*(*.js|*.min.css)");
