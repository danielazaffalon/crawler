/** get html text from the web */
async function getRawData(){
    const response = await fetch('https://news.ycombinator.com/');
    const body = await response.text();
    return body;
}

/** Execute Function */
async function execute(){
    const data = await getRawData();
    console.log(data);
}

execute();