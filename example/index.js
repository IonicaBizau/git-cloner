"use strict";

const gitCloner = require("../lib");

gitCloner([
    "IonicaBizau/git-stats"
  , {
        source: "IonicaBizau/node-cobol#1.5.0"
      , path: "a/bridge/to/1959"
    }
], `${__dirname}/clones`, (err, data) => {
    console.log(err || data);
});
