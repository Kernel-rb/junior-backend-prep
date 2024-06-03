const { test, expect } = require("@jest/globals")
const { normalizeUrl } = require("./crawl.js")



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
