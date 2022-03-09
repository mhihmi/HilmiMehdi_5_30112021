/**
 * @property {function} loadConfig Function to get url from config file
 * @returns promise which resolves with the result of parsing the body text as JSON / API URl
 */
async function loadConfig() {
    let result = await fetch("../config.json");
    return result.json();
}