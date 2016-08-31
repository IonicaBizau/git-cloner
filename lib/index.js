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
        let args = ["clone", this.source.toString(this.options.urlType), this.dest];

        if (this.options.shallow) {
            args.push("--depth=1");
        }

        spawn(
            "git"
          , args
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
                    return beforeDone(this, cb);
                });
            }
        );
    }
}

/**
 * gitCloner
 * Clones the git repositories specified in the `input` parameter.
 *
 *
 * @name gitCloner
 * @function
 * @param {Array} input An array of git sources: git urls (it
 * also supports owner/repo notation, parsed by
 * [`git-source`](https://github.com/IonicaBizau/git-source)),
 * or objects in this format:
 *
 *  - `source` (String): The source of the git repository.
 *  - `path` (String): The custom folder name/path where the repository
 *    should be cloned.
 *
 * @param {Object} options An object containing the following fields:
 *
 *  - `dest` (String): The folder where to clone the repositories (default: `"."`)
 *  - `urlType` (String): The git url type (default: `"ssh"`).
 *  - `showOutput` (Boolean): If `true`, the child process output streams will
 *    be piped in the main process.
 *  - `done` (Function): A function to be called after each repo was cloned.
 *  - `parallelLimit` (Number): A number representing the max count of git
 *    cloning processes in the same time (default: `5`).
 *  - `shallow` (Boolean): If `true`, a shallow clone will be created (i.e. `--depth=1`).
 *
 * @param {Function} cb The callback function.
 */
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
