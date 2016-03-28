"use strict";

const path = require("path")
    , spawn = require("spawno")
    , gitSource = require("git-source")
    , sameTime = require("same-time-limit")
    , bindy = require("bindy")
    , ul = require("ul")
    ;

class ClonerSource {
    constructor (input, options) {
        if (typeof input === "string") {
            this.source = input;
        } else {
            this.source = input.source;
        }
        this.options = options;
        this.source = gitSource(this.source);
        this.dest = path.resolve(options.dest, input.path || this.source.name);
    }
    clone (cb) {
        spawn(
            "git"
          , ["clone", this.source.toString(this.options.urlType), this.dest]
          , { _showOutput: this.options.showOutput }
          , (err, stdout, stderr, code) => {
                if (code !== 0) {
                    return cb(err || stderr);
                }
                let beforeDone = this.options.done;
                if (!this.source.hash) {
                    return beforeDone(this, cb);
                }
                spawn("git", ["checkout", this.source.hash], {
                    cwd: this.dest
                  , _showOutput: this.options.showOutput
                }, (err, stdout, stderr, code) => {
                    if (code !== 0) {
                        return cb(err || stderr);
                    }
                    this.options.after
                    return beforeDone(this, cb);
                });
            }
        );
    }
}

module.exports = function gitCloner(input, options, cb) {
    if (typeof options === "function") {
        cb = options;
        options = ".";
    }

    if (typeof options === "string") {
        options = {
            dest: options
        };
    }

    options = ul.merge(options, {
        dest: "."
      , urlType: "ssh"
      , showOutput: true
      , done: (ins, cb) => cb(null, ins)
      , parallelLimit: 5
    });

    if (!Array.isArray(input)) {
        input = [input];
    }

    input = input.map(c => new ClonerSource(c, options));

    sameTime(
        bindy(input, (c, done) => c.clone(done))
      , options.parallelLimit
      , cb
    );
};
