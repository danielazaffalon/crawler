import { load } from 'cheerio';

/**
 * Represents a news entry with its number, title, points, and comments.
 *
 * @class Entry
 * @typedef {Entry}
 */
class Entry {
    constructor(number, title, points, comments) {
        this.number = number;
        this.title = title;
        this.points = points;
        this.comments = comments;
    }

    /** 
     * Counts the number of words in a string.
     * Only considers words separated by spaces and excludes any symbols.
     * 
     * @param { string } text - string sentence
     * @returns { number } arrayLenghth - quantity of words in the sentence
    */
    wordCount(field){
        const arrayLenghth = this[field].split(' ').filter(word => word.length > 0).length;
        return arrayLenghth;
    }
}

export class Crawler{
    constructor(url){
        this.url = url;
    }

    /** 
     * Retrieves the raw HTML text from the specified URL.
     * 
     * @returns { Promise<string> } web raw DOM data string
    */
    async getRawData(){
        const response = await fetch(this.url);
        const body = await response.text();
        return body;
    }

    /**
     * Extracts relevant data from the DOM: number, title, points, and comments.
     * 
     * @param { string } body - raw DOM data string
     * @returns {{}} Array with relevant DOM data for each entry
     */
    dataScraping(body){
        const entries = [];
        const $ = load(body);

        $('tr.athing').each((_,item) => {
            const itemNode = $(item);
            const number = Number(itemNode.find('span.rank').text().split('.')[0]);
            const title = itemNode.find('span.titleline').find('a').text();
            const points = Number(itemNode.next().find('span.score').text().split(' ')[0]);
            const comments = Number(itemNode.next().find('span.subline').find('a:contains("comments")').text().split(/\s|&nbsp;/g)[0]);
            entries.push(new Entry(number, title, points || 0, comments || 0));
        });
        return entries;
    }

    /**
     * Filters and sorts an array of entries based on word count and a specified key.
     *
     * @param {array} entries - array with entri elements
     * @param {string} filterKey - Key of the elements to perform the word filter.
     * @param {number} WordLimit - Number of words to limit the filter.
     * @param {bool} longest - If true filter entries with more than WordLimit words. Otherwise, filter entries with less than or equal to WordLimit words.
     * @param {string} sortKey - Key under which the entities will be ordered
     * @param {bool} ascending - Key under which the entities will be ordered
     * @returns {array} Array of elements that meet the indicated filtering and ordering conditions.
     */
    filterEntries(entries, filterKey, WordLimit, longest, sortKey, ascending){
        const filterFunction = longest ? item => item.wordCount(filterKey) > WordLimit 
        : item => item.wordCount(filterKey) <= WordLimit;
        const sortFunction = ascending ? (a, b) => a[sortKey] - b[sortKey] : (a, b) => b[sortKey] - a[sortKey];
        const filteredEntries = entries.filter(filterFunction).sort(sortFunction);
        return filteredEntries;
    }
}