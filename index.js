#!/usr/bin/env node
var fs = require('fs');
var ProgressBar = require('progress');
var chalk = require('chalk');
var request = require('superagent');
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');

program
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(file => {
    co(function *() {
      var username = yield prompt('username: ');
      var password = yield prompt.password('password: ');

      var fileSize = fs.statSync(file).size;
      var fileStream = fs.createReadStream(file);
      var barOpts = {
        width: 20,
        total: fileSize,
        clear: true
      };
      var bar = new ProgressBar('uploading [:bar] :percent :etas', barOpts);
      fileStream.on('data', chunk => bar.tick(chunk.length));

      request
        .post('https://api.bitbucket.org/2.0/snippets/')
        .auth(username, password)
        .attach('file', fileStream)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (!err && res.ok) {
            var link = res.body.links.html.href;
            console.log(chalk.bold.cyan('Snippet created: ' + link));
            process.exit(0);
          }

          var errorMessage;
          if (res && res.status == 401)
            errorMessage = "Authentication failed! Bad username or password.";            
          else if (err)
            errorMessage = err;
          else
            errorMessage = res.text;
          console.error(chalk.bold.red(errorMessage));
          process.exit(1);
        });
    });
  })
  .parse(process.argv);