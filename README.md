
# git-cloner

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/git-cloner.svg)](https://www.npmjs.com/package/git-cloner) [![Downloads](https://img.shields.io/npm/dt/git-cloner.svg)](https://www.npmjs.com/package/git-cloner) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Clone multiple git repositories.

## :cloud: Installation

```sh
$ npm i --save git-cloner
```


## :clipboard: Example



```js
const gitCloner = require("git-cloner");

gitCloner([
    "IonicaBizau/git-stats"
  , {
        source: "IonicaBizau/node-cobol#1.5.0"
      , path: "a/bridge/to/1959"
    }
], `${__dirname}/clones`, (err, data) => {
    console.log(err || data);
});
```

## :memo: Documentation


### `gitCloner(input, options, cb)`
Clones the git repositories specified in the `input` parameter.

#### Params
- **Array** `input`: An array of git sources: git urls (it also supports owner/repo notation, parsed by
[`git-source`](https://github.com/IonicaBizau/git-source)),
or objects in this format:

 - `source` (String): The source of the git repository.
 - `path` (String): The custom folder name/path where the repository
   should be cloned.
- **Object** `options`: An object containing the following fields:
 - `dest` (String): The folder where to clone the repositories (default: `"."`)
 - `urlType` (String): The git url type (default: `"ssh"`).
 - `showOutput` (Boolean): If `true`, the child process output streams will
   be piped in the main process.
 - `done` (Function): A function to be called after each repo was cloned.
 - `parallelLimit` (Number): A number representing the max count of git
   cloning processes in the same time (default: `5`).
 - `shallow` (Boolean): If `true`, a shallow clone will be created (i.e. `--depth=1`).
- **Function** `cb`: The callback function.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`git-module-installer`](https://github.com/IonicaBizau/git-module-installer#readme)—Clone git repositories and install their npm dependencies.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
