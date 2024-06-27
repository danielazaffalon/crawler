import { jest } from '@jest/globals';
import { Entry } from '../scraping/scraping.js';
import { Crawler } from '../scraping/scraping.js';
import rawDataMock from './mocks/rawDataMock.js';
import entriesData from './mocks/entriesData.js';

const crawler = new Crawler('test');

const entries = entriesData.map(entry => new Entry(entry.number,entry.title,entry.points,entry.comments));

/**
 * Test case to verify successful retrieval of raw data from server.
 * Uses mocked fetch response with status 200.
 * 
 * @test
 */
test('Raw data retrieval success', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 200,
            text : () => Promise.resolve('raw data') 
        })
    );

    expect(await crawler.getRawData()).toBe('raw data');
});

/**
 * Test case to verify error handling during data retrieval.
 * Uses mocked fetch response with status 500.
 * 
 * @test
 */
test('Raw data retrieval error handling', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 500,
            statusText: 'error',
        })
    );
    try{
        await crawler.getRawData();
    }
    catch(error){
        expect(error).toBe("Error fetching data: error");
    }
});

/**
 * Tests the word count functionality of the Entry class.
 * 
 * @test
 */
test('Entry.wordCount("title"): Counts words in "count title words test". Expected 4', () =>{
    const entry = new Entry(0,'count title words test',0,0);
    expect(entry.wordCount('title')).toBe(4);
});

/**
 * Tests the word count functionality with an empty string.
 * 
 * @test
 */
test('Entry.wordCount("title"): Counts words in empty string. Expected 0', () =>{
    const entry = new Entry(0,'',0,0);
    expect(entry.wordCount('title')).toBe(0);
});

/**
 * Tests the word count functionality with a non-string field.
 * 
 * Expects an error to be thrown.
 * 
 * @test
 * @throws {Error} Error Counting Words, the field is not a string.
 */
test('Entry.wordCount("points"): Throws error for non-string field', () =>{
    const entry = new Entry(0,'title',0,0);
    expect(()=>{
        entry.wordCount('points')
    }).toThrow('Error Counting Words, the field is not a string.');
});

/**
 * Tests the dataScraping function of the Crawler class.
 *
 * @test
 */
test('Crawler.dataScraping(body): Returns 30 entries array from full body html', () =>{
    expect(crawler.dataScraping(rawDataMock.fullData).length).toBe(30);
});

/**
 * Tests the dataScraping function of the Crawler class with a short body.
 *
 * @test
 */
test('Crawler.dataScraping(body): Returns 18 entries array from short body html', () =>{
    expect(crawler.dataScraping(rawDataMock.shortData).length).toBe(18);
});

/**
 * Tests the dataScraping function of the Crawler class with an empty body.
 *
 * @test
 */
test('Crawler.dataScraping(body): Returns 0 entries array from empty body html', () =>{
    expect(crawler.dataScraping('').length).toBe(0);
});

/**
 * Test case for filtering entries with titles longer than 5 words and sorting by comments in ascending order.
 * 
 * @test
 */
test('Crawler.filterEntries: Filter and sort entries with titles longer than 5 words by comments ascending', () => {
    const filterKey = 'title';
    const WordLimit = 5;
    const longest = true;
    const sortKey = 'comments';
    const ascending = true;

    const result = crawler.filterEntries(entries, filterKey, WordLimit, longest, sortKey, ascending);

    expect(result.length).toBe(22); // Expecting only 11 entries with titles longer than the word limit
    expect(result.map(entry => entry.number)).toEqual([21, 22,  9,  5, 19, 15, 18, 17, 29, 14, 16,  4, 12, 11, 2,  7, 24, 30, 23, 27,  3, 13]);
});

/**
 * Test case for filtering entries with titles 5 words or shorter and sorting by points in descending order.
 * 
 * @throws {Error} Error Filtering Entries
 */
test('Crawler.filterEntries: Filter and sort entries with titles 5 words or shorter by points descending', () => {
    const filterKey = 'title';
    const WordLimit = 5;
    const longest = false;
    const sortKey = 'points';
    const ascending = true;
    const result = crawler.filterEntries(entries, filterKey, WordLimit, longest, sortKey, ascending);

    expect(result.length).toBe(8);
    expect(result.map(entry => entry.number)).toEqual([10,  6, 26, 8, 28, 20, 25, 1]);
});

/**
 * Test case for filtering entries with an empty array of entries.
 * 
 * Validates that the filterEntries method gracefully handles an empty array of entries.
 * 
 * @throws {Error} Error Filtering Entries
 */
test('Crawler.filterEntries: Filter entries with empty array', () => {
    const emptyArray = [];
    const filterKey = 'title';
    const WordLimit = 5;
    const longest = true;
    const sortKey = 'comments';
    const ascending = true;

    const result = crawler.filterEntries(emptyArray, filterKey, WordLimit, longest, sortKey, ascending);

    expect(result.length).toBe(0);
});

/**
 * Test case for filtering entries with an invalid filter key.
 * 
 * Validates that the filterEntries method throws an error when provided with an invalid filter key.
 * 
 * @throws {Error} Error Filtering Entries
 */
test('Crawler.filterEntries: Throw error for invalid filterKey', () => {
    const filterKey = 'invalidKey';
    const WordLimit = 5;
    const longest = true;
    const sortKey = 'comments';
    const ascending = true;

    expect(() => {
        crawler.filterEntries(entriesData, filterKey, WordLimit, longest, sortKey, ascending);
    }).toThrow('Error Filtering Entries');
});