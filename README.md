# setup-resharper

[![version](https://img.shields.io/github/v/release/goit/setup-resharper?style=flat-square)](https://github.com/marketplace/actions/setup-resharper-command-line-tools)
[![build-test](https://github.com/goit/setup-resharper/workflows/build-test/badge.svg)](https://github.com/goit/setup-resharper/actions?query=workflow%3Abuild-test)

This action sets up a [ReSharper Command Line Tools](https://www.jetbrains.com/help/resharper/ReSharper_Command_Line_Tools.html) environment for use in actions by:

- downloading and caching a version of ReSharper CTL and adding it to PATH

## Usage

See [action.yml](action.yml)

Basic:

```yaml
steps:
- uses: actions/checkout@master
- uses: goit/setup-resharper@v2.0.0
  with:
    version: '2021.2'
- run: InspectCode <solution file>
```

## Note

Use `goit/setup-resharper@v1.0.0` for ReSharper CTL 2020.1 and older releases.

The download address changed and `goit/setup-resharper@v2.0.0` supports ReSharper CTL 2020.2 and newer.

## License

Scripts and documentation in this project are released under the [MIT License](LICENSE)
