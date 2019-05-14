# Contributing guidelines

## Table of Contents

- [Getting started](#getting-started)
  - [Language](#language)
    - [For native English speakers](#for-native-english-speakers)
  - [Code of Conduct](#code-of-conduct)
- [How can I contribute?](#how-can-i-contribute)
  - [Documentation](#documentation)
  - [Issues](#issues)
    - [Submitting an issue](#submitting-an-issue)
  - [Feedback](#feedback)
  - [Code](#Code)
    - [Dev environment](#dev-environment)
- [Commiting](#Commiting)
- [Submitting a pull request](#submitting-a-pull-request)

## Getting started

First off, we would like to thank you for taking the time to contribute and make this a better project!

Here we have a set of instructions and guidelines to reduce misunderstandings and make the process of contributing to `unform` as smooth as possible.

We hope this guide makes the contribution process clear and answers any questions you may have.

### Language

Please, while contributing or interacting in any way in this project, refrain from using any language other than **English**.

#### For native English speakers

Try to use simple words and sentences. Don't make fun of non-native English speakers if you find something wrong about the way they express themselves.

Try to encourage newcomers to express their opinions, and make them comfortable enough to do so.

### Code of Conduct

We expect that project participants to adhere to our Code of Conduct. You can check the the [full text]](CODE_OF_CONDUCT.md) so that you may understand the kind of conduct we are expecting and what actions will and will not be tolerated.

By participating in this project, you agree to abide by its terms.

## How can I help?

Here are some ways you can help along with some guidelines.

### Documentation

As a user of `unform`, you're the perfect candidate to help us improve our documentation!

Typos, errors, lack of examples and/or explanation and so on, are just some examples of things that could be fixed and/or improved.

You could even make improvements to this guide! :)

While documenting, try to keep things simple and clear.

### Issues

Some issues are created with missing information, without a template, not reproducible, or plain
invalid.

You can make them easier to understand and resolve.

#### Submitting an issue

- Please search for similar issues before opening a new one;
- Use one of the corresponding issue template;
- Use a clear and descriptive title;
- Include as much information as possible by filling out the provided issue
  template;
- Most of the time, the best way to report an issue is a failing test proving it.

### Feedback

The more feedback the better! We're always looking for more suggestions and opinions on discussions. That's a good opportunity to influence the future direction of this tool.

This includes submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

The [`question`](https://github.com/Rocketseat/unform/labels/question)
and
[`rfc`](https://github.com/Rocketseat/unform/labels/rfc)
labels are a good place to find ongoing discussions.

### Code

You can use issue labels to discover issues you could help out with:

- [`bug` issues](https://github.com/Rocketseat/unform/labels/bug)
  are known bugs we'd like to fix;
- [`enhancement` issues](https://github.com/Rocketseat/unform/labels/enhancement)
  are features we're open to including.

The
[`help wanted`](https://github.com/Rocketseat/unform/labels/help%20wanted)
and
[`good first issue`](https://github.com/Rocketseat/unform/labels/good%20first%20issue)
labels are especially useful.

You may find an issue is assigned. Please double-check before starting on this issue because somebody else is likely already working on it.

#### Dev environment

When developing, prefer using **Node** ≥ 8 and **yarn**. Writing code with the latest stable Node versions allows us to use newer developer tools.

After [cloning the repository](https://help.github.com/articles/cloning-a-repository/), run `yarn` to install dependencies.

A summary of the scripts:

- To run the example use `yarn dev:example`;
- The `yarn dev:start` command will build the lib and watch files in bundle and rebuild on changes;
- Running `yarn dev` will run both `dev:example` and `dev:start`;
- Use `yarn test` to run the test suite (powered by [Jest](https://facebook.github.io/jest/));
- `yarn coveralls` can't be used locally, this is only used to provide test coverage statistics to [Coveralls](https://coveralls.io);
  - For code coverage locally, you can run `yarn test --coverage`.
- `yarn build` will build the lib using [Rollup](https://rollupjs.org/guide/en);

This project uses [Prettier](http://prettier.io/) for code formatting. Consider installing an [editor plugin](https://prettier.io/docs/en/editors.html) for the best experience, but code will also be formatted with a precommit script (using [lint-staged](https://github.com/okonet/lint-staged)).

## Commiting

- Never use the `-m <msg>` / `--message=<msg>` flag to `git commit`;
- Use the present tense ("Add feature" not "Added feature");
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...");
- The first line should:
  - Be capitalized;
  - Have 50 characters or less;
  - Omit any trailing punctuation;
  - Be followed by a blank line.
- The following lines should have 72 characters or less;
- Reference issues and pull requests liberally after the first line;
- When creating a commit try to answer the following questions:
  - Why is this change necessary?
  - How does it address the issue?
  - What side effects (if any) does this change may have?

Example:

```
Commit message style guide for Git

The first line of a commit message serves as a summary.  When displayed
on the web, it's often styled as a heading, and in emails, it's
typically used as the subject. As such, you should capitalize it and
omit any trailing punctuation. Aim for about 50 characters, give or
take, otherwise it may be painfully truncated in some contexts. Write
it, along with the rest of your message, in the present tense and imperative mood: "Fix
bug" and not "Fixed bug" or "Fixes bug". Consistent wording makes it
easier to mentally process a list of commits.

Oftentimes a subject by itself is sufficient.  When it's not, add a
blank line (this is important) followed by one or more paragraphs hard
wrapped to 72 characters.  Git is strongly opinionated that the author
is responsible for line breaks; if you omit them, command line tooling
will show it as one extremely long unwrapped line. Fortunately, most
text editors are capable of automating this.

When relevant, issues and pull request can be referenced using theirs numbers: #3 #12
```

## Submitting a pull request

Before submitting a pull request, please make sure the following is done:

- [Fork](https://help.github.com/en/articles/fork-a-repo) the repository and create your branch from `master`.
  - Example: `feature/my-awesome-feature` or `fix/annoying-bug`;
- Run `yarn` in the repository root;
- If you’ve fixed a bug or added code that should be tested, **add tests**;
- Ensure the test suite passes.
