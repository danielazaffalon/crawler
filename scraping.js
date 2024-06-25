import { load } from 'cheerio';

/** get html text from the web */
async function getRawData(){
    const response = await fetch('https://news.ycombinator.com/');
    const body = await response.text();
    return body;
}

/** parse the html text and extract titles */
async function parseData(data){
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

/** Execute Function */
async function execute(){
    const data = await getRawData();
    const rta = await parseData(data)
    console.log(rta);
}

execute();