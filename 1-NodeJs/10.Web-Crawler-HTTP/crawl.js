/*
    - The role of normlize funct is to take a url string and return all other urls that point to the same page.
    - for example:
            -> http://www.example.com
            -> https://www.example.com
        
*/


function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }
    return hostPath.toLowerCase();
}

module.exports = {
    normalizeUrl
}