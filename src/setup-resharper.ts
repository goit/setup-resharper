import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';

const RESHAPER_CTL_CACHE_NAME = 'v2-resharper-ctl';

async function run() {
  try {
    let version = core.getInput('version');

    console.log(`ReSharper Command Line Tools release ${version}`);

    console.log('Checking tool cache');
    let toolPath = tc.find(RESHAPER_CTL_CACHE_NAME, version);

    if (!toolPath) {
      let url = `https://download.jetbrains.com/resharper/dotUltimate.${version}/JetBrains.ReSharper.CommandLineTools.${version}.zip`;

      console.log('Downloading ReSharper CTL', url);
      let downloadPath = await tc.downloadTool(url);

      console.log('Extracting tools', downloadPath);
      let extPath: string = await tc.extractZip(downloadPath);

      console.log('Caching tools');
      let cachedDir = await tc.cacheDir(extPath, RESHAPER_CTL_CACHE_NAME, version);
      toolPath = cachedDir;
    } else {
      console.log('Using cached tool');
    }

    core.exportVariable('RESHARPER_ROOT', toolPath);
    core.addPath(toolPath);

    console.log('Successfully installed', version);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
