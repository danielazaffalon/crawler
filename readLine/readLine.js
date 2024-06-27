import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process';


/**
 * Prompts the user to select a filter option and returns the corresponding parameters.
 *
 * @export
 * @async
 * @function getParams
 * @returns {Promise<Object>} An object containing the filter parameters.
 * @property {string} filterKey - The key to filter the entries by.
 * @property {number} WordLimit - The word limit for filtering titles.
 * @property {boolean} longest - True if filtering titles with more than WordLimit words, false otherwise.
 * @property {string} sortKey - The key to sort the filtered entries by.
 * @property {boolean} ascending - True if sorting in ascending order, false otherwise.
 */
export async function getParams(){
    const rl = readline.createInterface({ input, output });
    try{
        const answer = await rl.question('Please, select filter by typing the filter number:\n' + 
            '1\tFilter all entries with more than five words in the title ordered by the number of comments.\n' + 
            '2\tFilter entries with less than or equal to five words in the title ordered by points.\n');
        if (answer !== '1' && answer !== '2') throw new Error('Invalid Filter Selection');
        const params = {
            filterKey : 'title',
            WordLimit : 5,
            longest : answer.trim() === '1',
            sortKey : answer.trim() === '1' ? 'comments' : 'points',
            ascending : true
        };
        rl.close();
        return params
    }
    catch(e){
        rl.close();
        throw `Error getting params from terminal: ${e.message}`;
    }
}