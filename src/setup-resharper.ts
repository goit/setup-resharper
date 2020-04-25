import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';

const IS_WINDOWS = process.platform === 'win32';
const RESHAPER_CTL_CACHE_NAME = 'resharper-ctl';

async function run() {
  try {
    let version = core.getInput('version');

    console.log(`ReSharper Command Line Tools release ${version}`);

    console.log('Checking tool cache');
    let toolPath = tc.find(RESHAPER_CTL_CACHE_NAME, version);

    if (!toolPath) {
      let url = ''
      if (IS_WINDOWS) {
        url = `https://download.jetbrains.com/resharper/ReSharperUltimate.${version}/JetBrains.ReSharper.CommandLineTools.${version}.zip`;
      } else {
        url = `https://download.jetbrains.com/resharper/ReSharperUltimate.${version}/JetBrains.ReSharper.CommandLineTools.Unix.${version}.tar.gz`;
      }

      console.log('Downloading ReSharper CTL', url);
      let downloadPath = await tc.downloadTool(url);

      console.log('Extracting tools', downloadPath);
      let extPath: string = IS_WINDOWS ? await tc.extractZip(downloadPath) : await tc.extractTar(downloadPath);

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
