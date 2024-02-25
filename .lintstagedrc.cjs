module.exports = {
  /**
   * @see https://github.com/okonet/lint-staged#reformatting-the-code
   * @see https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments
   */
  '**/*.ts?(x)': () => ['eslint --fix .', 'tsc -p tsconfig.json --noEmit'],
};
