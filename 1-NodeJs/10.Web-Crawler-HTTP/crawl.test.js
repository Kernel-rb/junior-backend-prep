const { test, expect } = require("@jest/globals")
const { normalizeUrl , getURLsFromHTML } = require("./crawl.js")



test("normalizeUrl strip protocol ", () => {
    const input = "https://blog.boot.dev/path";
    const ouptut = normalizeUrl(input);
    const expectedOuptut = "blog.boot.dev/path"
    expect(ouptut).toEqual(expectedOuptut);
});

test("delete slash at the end of URL ", () => {
    const input = "https://blog.boot.dev/path/";
    const ouptut = normalizeUrl(input);
    const expectedOuptut = "blog.boot.dev/path"
    expect(ouptut).toEqual(expectedOuptut);
});

test("normalizeUrl capitals ", () => {
    const input = "https://BLOG.boot.dev/path";
    const ouptut = normalizeUrl(input);
    const expectedOuptut = "blog.boot.dev/path"
    expect(ouptut).toEqual(expectedOuptut);
});

test("normalizeUrl capitals ", () => {
    const input = "http://blog.boot.dev/path";
    const ouptut = normalizeUrl(input);
    const expectedOuptut = "blog.boot.dev/path"
    expect(ouptut).toEqual(expectedOuptut);
});


test("Get urls from html", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://saifmatab.me">
                My website
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = "https://saifmatab.me"
    const ouptut = getURLsFromHTML(inputHTMLBody, inputBaseUrl );
    const expectedOuptut = ["https://saifmatab.me"]
    expect(ouptut).toEqual(expectedOuptut);
})