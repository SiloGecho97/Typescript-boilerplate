### Git commit messages

- Limit the subject line to 72 characters
- Use the present tense ("Add feature" instead of "Added feature")
- fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
- feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
- BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
- types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
- footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

### Coding style guide

We are using ESLint to ensure a consistent code style in the project, based on [Airbnb's JS style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base).

Some other ESLint plugins are also being used, such as the [Prettier](https://github.com/prettier/eslint-plugin-prettier) and [Jest](https://github.com/jest-community/eslint-plugin-jest) plugins.

Please make sure that the code you are pushing conforms to the style guides mentioned above.

Save
