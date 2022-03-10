/**
 * @file config.js is for all page sending request to the API
 * @author Medivix
 * @see <a href="https://github.com/mhihmi/HilmiMehdi_5_30112021" rel="noopener noreferrer" target="_blank"> Repo Git </a>
 */

/**
 * @property {function} loadConfig Function to get url from config file
 * @returns promise which resolves with the result of parsing the body text as JSON / API URl
 */
async function loadConfig() {
    let result = await fetch("../config.json");
    return result.json();
}