const { JSDOM } = require("jsdom");

function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }
    return hostPath.toLowerCase();
}



function getURLsFromHTML(htmlBody , baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkEl = dom.window.document.querySelectorAll('a');
    console.log(linkEl.href);
    for (const i in linkEl) {
        console.log(linkEl.href);
        urls.push(linkEl.href);

    }
    return urls
    console.log(urls)
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}