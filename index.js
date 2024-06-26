import { Crawler } from "./scraping.js";

/** Execute Function */
async function execute(){
    const crawler = new Crawler('https://news.ycombinator.com/');
    const rawData = await crawler.getRawData();
    const entries = crawler.dataScraping(rawData);
    const filteredEntries = crawler.filterEntries(entries, 'title', 5, true, "comments", true);

    console.log(filteredEntries);
}
execute();