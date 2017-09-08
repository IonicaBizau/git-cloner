## Documentation

You can see below the API reference of this module.

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

