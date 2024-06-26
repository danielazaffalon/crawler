import { Crawler } from "./scraping.js";
import { LogEntry } from "./log.js";

/** Execute Function */
async function execute(){

    const logEntry = new LogEntry();//"requestedFilter"
    const crawler = new Crawler('https://news.ycombinator.com/');
    const rawData = await crawler.getRawData();
    const entries = crawler.dataScraping(rawData);
    logEntry.fillAttribute(entries.length,"totalCrawledEntries");
    const filteredEntries = crawler.filterEntries(entries, 'title', 5, true, "comments", true);
    logEntry.fillAttribute(filteredEntries.length,"totalFilteredEntries");
    logEntry.endLog();

    // console.log(filteredEntries);
    console.log(logEntry.exportLog());
}
execute();