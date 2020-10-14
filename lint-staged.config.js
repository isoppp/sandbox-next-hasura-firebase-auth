// copied from https://github.com/zeit/next.js/blob/canary/lint-staged.config.js
const escape = require('shell-quote').quote

module.exports = {
  '**/*.{ts,tsx}': (filenames) => {
    const escapedFileNames = filenames.map((filename) => `"${escape([filename])}"`).join(' ')
    return [`prettier' --write ${escapedFileNames}`, `eslint --fix ${escapedFileNames}`]
  },
  '**/*.{js, json,md,mdx,html,css,scss,yml,yaml}': (filenames) => {
    const escapedFileNames = filenames.map((filename) => `"${escape([filename])}"`).join(' ')
    return [`prettier --write ${escapedFileNames}`]
  },
}
