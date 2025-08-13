/**
 * @file config.js is for all page sending request to the API
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

/**
 * Function to get url from config file
 * @returns promise which resolves with the result of parsing the body text as JSON / API URl
 */
async function loadConfig() {
    let configPath;
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        configPath = "../config.json";
    } else {
        configPath = "/kanap/config.json";
    }
    let result = await fetch(configPath);
    return result.json();
}