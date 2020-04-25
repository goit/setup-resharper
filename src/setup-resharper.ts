import * as core from '@actions/core';

async function run() {
  try {
    let version = core.getInput('version');

    console.log(`ReSharper Command Line Tools release ${version}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
