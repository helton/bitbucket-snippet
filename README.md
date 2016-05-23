# bitbucket-snippet

A command-line tool for creating Bitbucket snippets.
Built while following the Tim Pettersen tutorial available at [Building command line tools with Node.js](https://developer.atlassian.com/blog/2015/11/scripting-with-node/).
This package is not published on npm, so you need to clone it in order to install it globally.
The official package (from _tpettersen_) is available on [npm](https://www.npmjs.com/package/bitbucket-snippet) and the source can be found at [BitBucket](https://bitbucket.org/tpettersen/bitbucket-snippet)

## Setup
- Run `git clone https://github.com/helton/bitbucket-snippet.git`
- Run `cd bitbucket-snippet`
- Run `npm install -g`

## Usage
  bitbucket-snippet [options] <file>
  
  Options:

    -h, --help                 output usage information
    -u, --username <username>  The user to authenticate as
    -p, --password <password>  The user's password