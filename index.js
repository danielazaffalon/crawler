import { Crawler } from './scraping.js';
import { LogEntry } from './log.js';
import { getParams } from './readLine.js';
import { StorageService } from './storageService.js';

/** Execute Function */
async function execute(){
    const logEntry = new LogEntry();
    const storageService = new StorageService();
    try{
        const params = await getParams();
        logEntry.fillAttribute(params,'requestedFilter');
        const crawler = new Crawler('https://news.ycombinator.com/');
        const rawData = await crawler.getRawData();
        const entries = crawler.dataScraping(rawData);
        logEntry.fillAttribute(entries.length,'totalCrawledEntries');
        const filteredEntries = crawler.filterEntries(entries, params.filterKey, params.WordLimit, params.longest, params.sortKey, params.ascending);
        logEntry.fillAttribute(filteredEntries.length,'totalFilteredEntries');
    }
    catch(error){
        logEntry.fillAttribute(error,'error');
        console.error(error);
    }
    logEntry.endLog();
    await storageService.insertLogEntry(logEntry.exportLog());
    process.exit(0);
}
execute().catch(error => { 
    console.error(error);
    process.exit(0);
 });