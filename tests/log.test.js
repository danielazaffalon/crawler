import { LogEntry } from '../log/log.js';

let logEntry;

beforeEach(() => {
    logEntry = new LogEntry();
});

/**
 * Test case to check if start time is initialized correctly.
 * @test
 */
test('should initialize start time when created', () => {
    expect(logEntry.logAttributes.start).not.toBeNull();
});

/**
 * Test case to check if filling attribute works correctly.
 * @test
 */
test('should fill attribute correctly', () => {
    const testMsg = 'Test message';
    const testKey = 'requestedFilter';
    logEntry.fillAttribute(testMsg, testKey);
    expect(logEntry.logAttributes[testKey]).toBe(testMsg);
});

/**
 * Test case to check if endLog correctly sets end time and calculates elapsed time.
 * @test
 */
test('should mark the end of log correctly', () => {
    logEntry.endLog();
    expect(logEntry.logAttributes.end).not.toBeNull();
    expect(logEntry.logAttributes.elapsedTime).not.toBeNull();
});

/**
 * Test case to check if exportLog returns the correct log attributes object.
 * @test
 */
test('should export log attributes correctly', () => {
    const testMsg = 'Test message';
    const testKey = 'error';
    logEntry.fillAttribute(testMsg, testKey);
    logEntry.endLog();
    const exportedLog = logEntry.exportLog();
    expect(exportedLog.start).not.toBeNull();
    expect(exportedLog.end).not.toBeNull();
    expect(exportedLog.elapsedTime).not.toBeNull();
    expect(exportedLog.requestedFilter).toBeNull(); // As it was not filled in this test
    expect(exportedLog.totalCrawledEntries).toBeNull(); // As it was not filled in this test
    expect(exportedLog.totalFilteredEntries).toBeNull(); // As it was not filled in this test
    expect(exportedLog.error).toBe(testMsg);
});