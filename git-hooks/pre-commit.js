const chalk = require('chalk');
const exec = require('../util/generic-functions.util').exec;
const log = console.log;
const TIMEOUT = 5000;

preCommit();
cleanup();

function preCommit() {
  // checkBranchName();
  lint();
  process.exit(0);
}

// function checkBranchName() {
//   const branchName = exec('git rev-parse --abbrev-ref HEAD', { trim: true });
//   const isInRemote =
//     exec(`git show-branch remotes/upstream/${branchName}`, { toString: false }).code === 0;

//   if (!isInRemote) {
//     const validBranchPrefix = 'feature|bugfix|hotfix';
//     const validBranchesRegex = new RegExp(`^(${validBranchPrefix})/[\\w.-]+$`);
//     if (!validBranchesRegex.test(branchName)) {
//       const msg = `Branch names in this project must adhere to this contract: ${validBranchPrefix}.`;
//       log(chalk.bgRed.white.bold(msg));
//       process.exit(1);
//     }
//   }
// }

function lint() {
  const lintData = chalk.bgRed.white.bold(exec('npm run lint', { trim: true }));
  if (lintData.split('\n').length > 2) {
    log(lintData);
    process.exit(1);
  }
}

function cleanup() {
  setTimeout(() => {
    log(chalk.bgRed.white.bold('PreCommit hook is taking a lot of time to execute!'));
    process.exit(0);
  }, TIMEOUT);
}
