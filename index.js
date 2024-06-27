import { Crawler } from './scraping.js';
import { LogEntry } from './log.js';
import { getParams } from './readLine.js';
import { StorageService } from './storageService.js';

/**
 * Executes the main crawling and logging process.
 * 
 * This function:
 * 1. Initializes logging and storage services.
 * 2. Prompts the user for filtering parameters.
 * 3. Initiates a web crawler to fetch and scrape data from Hacker News.
 * 4. Filters the scraped entries based on user input.
 * 5. Logs relevant data such as the number of entries crawled and filtered.
 * 6. Handles errors and logs them.
 * 7. Stores the log entry in a storage service.
 * 8. Exits the process upon completion.
 * 
 * @async
 * @function execute
 * @returns {Promise<void>}
 */
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