import { load } from 'cheerio';

/** 
 * Get html text from the url web 
 * @param { string } url - url of the web
 * @returns { Promise<string> } body - web raw DOM data string
*/
async function getRawData(url){
    const response = await fetch(url);
    const body = await response.text();
    return body;
}

/**
 * Scrape relevant DOM data: number, title, points, comments
 * @param { string } data - raw DOM data string
 * @returns { Array } array - array with relevant DOM data for each entry
 */
function dataScraping(data){
    const dataArray = [];
    const $ = load(data);

    $('tr.athing').each((_,item) => {
        const itemNode = $(item);
        const entry = {};
        entry.number = Number(itemNode.find('span.rank').text().split('.')[0]);
        entry.title = itemNode.find('span.titleline').find('a').text();
        entry.points = Number(itemNode.next().find('span.score').text().split(' ')[0]);
        entry.comments = Number(itemNode.next().find('span.subline').find('a:contains("comments")').text().split(/\s|&nbsp;/g)[0]);
        dataArray.push(entry);
    });
    
    return dataArray;
}

/** 
 * Count words in a string. 
 * This function consider only the spaced words and exclude any symbols.
 * @param { string } text - string sentence
 * @returns { number } arrayLenghth - quantity of words in the sentence
*/
function wordCount(text){
    const arrayLenghth = text.split(' ').length;
    return arrayLenghth;
}

/**
 * This function filters an array of elements by the number of words in indicated key. 
 * If the argument longTitles is true, it will return the elements that have more than that number of words. 
 * Otherwise, it will return those with that number of words or less.
 * Finally the result will be sorted according to the key indicated in sortKey and if ascending is true, 
 * it will return in ascending order. Otherwise it will return in descending order.
 * @param { array } inputArray - Array with elements
 * @param { string } filterKey - Key of the elements to perform the word filter. Ex. Title.
 * @param { number } number - Number of words to limit the filter.
 * @param { bool } longTitles - True for filter entries with more than five words in the title. False, filter entries with less than or equal to five words in the title
 * @param { string } sortKey - Key of the elements to order. Ex. Comments.
 * @param { bool } ascending - True for ascending order, false for descending order.
 * @returns { object } filteredArrays - Array of elements that meet the indicated filtering and ordering conditions.
*/
function titlesFilter(inputArray, filterKey, number, longTitles, sortKey, ascending){
    const filterFunction = longTitles ? item => wordCount(item[filterKey]) > number 
    : item => wordCount(item[filterKey]) <= number;
    const sortFunction = ascending ? (a, b) => a[sortKey] - b[sortKey] : (a, b) => b[sortKey] - a[sortKey];
    const filteredArrays = inputArray.filter(filterFunction).sort(sortFunction);
    return filteredArrays;
}

/** Execute Function */
async function execute(){
    const data = await getRawData('https://news.ycombinator.com/');
    const dataArray = dataScraping(data);
    const titlesFiltered = titlesFilter(dataArray, 'title', 5, false, "comments", false);

    console.log(titlesFiltered);
}

execute();