import { jest } from '@jest/globals';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { getParams } from "../readLine/readLine.js";

let mockInterface;

beforeEach(() => {
    mockInterface = {
        question: jest.fn(),
        close: jest.fn()
    };
    readline.createInterface = jest.fn(() => mockInterface);
});

/**
 * Test case to validate filter parameters for option 1.
 * @test
 */
test('should return correct filter parameters for option 1', async () => {
    mockInterface.question.mockResolvedValueOnce('1');
    
    const params = await getParams();

    expect(params.filterKey).toBe('title');
    expect(params.WordLimit).toBe(5);
    expect(params.longest).toBe(true);
    expect(params.sortKey).toBe('comments');
    expect(params.ascending).toBe(true);
    expect(mockInterface.close).toHaveBeenCalled();
});

/**
 * Test case to validate filter parameters for option 2.
 * @test
 */
test('should return correct filter parameters for option 2', async () => {
    mockInterface.question.mockResolvedValueOnce('2');
    
    const params = await getParams();

    expect(params.filterKey).toBe('title');
    expect(params.WordLimit).toBe(5);
    expect(params.longest).toBe(false);
    expect(params.sortKey).toBe('points');
    expect(params.ascending).toBe(true);
    expect(mockInterface.close).toHaveBeenCalled();
});

/**
 * Test case to validate error handling for invalid input.
 * @test
 */
test('should throw error for invalid filter selection', async () => {
    mockInterface.question.mockResolvedValueOnce('3'); // Invalid option
    try{
        await getParams();
    }
    catch(error){
        expect(error).toBe('Error getting params from terminal: Invalid Filter Selection');
    }

    expect(mockInterface.close).toHaveBeenCalled();
});