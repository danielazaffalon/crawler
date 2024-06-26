/**
 * Represents a log entry with attributes for logging details.
 * @class LogEntry
 * @export
 */
export class LogEntry {

    /**
     * @typedef {Object} LogAttributes
     * @property {number} start - Timestamp when the log entry started.
     * @property {number} end - Timestamp when the log entry ended.
     * @property {string} requestedFilter - Filter requested for the log entry.
     * @property {number} totalCrawledEntries - Total number of entries crawled.
     * @property {number} totalFilteredEntries - Total number of entries after filtering.
     * @property {string|null} error - Error message if any occurred during the log entry.
     */
    logAttributes = {
        start: null,
        end: null,
        requestedFilter : null,
        totalCrawledEntries : null,
        totalFilteredEntries : null,
        elapsedTime : null,
        error: null
    }
    
    /**
     * Constructs a new LogEntry instance and initializes the start attribute timestamp.
     */
    constructor(){
        this.logAttributes.start = Date.now();
    }

    /**
     * Fills a specific attribute in the log entry.
     * Attributes are: requestedFilter, totalCrawledEntries, totalFilteredEntries, error
     * @param {*} logMsg - Log message to set.
     * @param {string} logKey - Key of the log attribute to fill.
     */
    fillAttribute(logMsg,logKey){
        this.logAttributes[logKey] = logMsg;
    }

    /**
     * Marks the end of the log entry by setting the end timestamp attribute.
     * @returns {void}
     */
    endLog(){
        this.logAttributes.end = Date.now();
        this.logAttributes.elapsedTime = this.logAttributes.end - this.logAttributes.start;
    }

    /**
     * Exports the log attributes object.
     * @returns {LogAttributes} - Object containing all log attributes.
     */
    exportLog(){
        return this.logAttributes;
    }
}
