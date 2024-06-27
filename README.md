# Hacker News Web Crawler

This project is a web crawler that fetches the first 30 entries from [Hacker News](https://news.ycombinator.com/), extracts relevant data (number, title, points, and comments), and allows for filtering and sorting operations on the data. The filtered data and operation logs are stored for further analysis.

## Features

- Fetches the first 30 entries from Hacker News.
- Extracts the following data for each entry:
  - Number
  - Title
  - Points
  - Number of comments
- Allows filtering and sorting of entries based on user input:
  - Filter entries with more than five words in the title, sorted by the number of comments.
  - Filter entries with five or fewer words in the title, sorted by points.
- Stores log entries containing:
  - Start and end timestamps
  - Requested filter
  - Total number of crawled entries
  - Total number of filtered entries
  - Any errors encountered during the operation

## Technologies Used

- Node.js
- Firebase Firestore
- Cheerio (for web scraping)
- JSDoc (for documentation)
- Jest (for testing)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/danielazaffalon/crawler.git
    cd crawler
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up Firebase Firestore:
   - Follow the instructions [here](https://firebase.google.com/docs/firestore/quickstart) to set up a Firestore database.
   - Create .env file with the following variables from the firebase configuration: 
    ```
      API_KEY=
      AUTH_DOMAIN=
      PROJECT_ID=
      STORAGE_BUCKET=
      MESSAGING_SENDER_ID=
      APP_ID=
    ```

## Usage

1. Run the crawler:
    ```bash
    node index.js
    ```

2. Follow the prompts to select the filter options:
   - `1` for filtering entries with more than five words in the title, sorted by the number of comments.
   - `2` for filtering entries with five or fewer words in the title, sorted by points.

## Project Structure

├── config.js # Configuration file for Firebase  
├── index.js # Main entry point of the application  
├── log.js # LogEntry class definition  
├── package.json # Project dependencies and scripts  
├── readLine.js # Function to get user input from the terminal  
├── scraping.js # Crawler class definition  
├── storageService.js # StorageService class definition  
└── README.md # Project documentation  

## Documentation

The project is documented using JSDoc. To generate the documentation:

1. Install JSDoc globally if you haven't already:
    ```bash
    npm install -g jsdoc
    ```

2. Generate the documentation:
    ```bash
    jsdoc -c jsdoc.json
    ```

3. Open the generated documentation in your browser:
    - Windows:
    ```bash
    start docs/index.html
    ```
    - macOS:
    ```bash
    open docs/index.html
    ```
    - Linux:
    ```bash
    xdg-open docs/index.html
    ```

## Testing

The project uses Jest for unit testing. Below are the test cases implemented:

### `getParams` Function

- **Filter Parameter Selection**:
  - Validates correct filter parameters for option 1 (more than 5 words in title, sorted by comments).
  - Validates correct filter parameters for option 2 (5 or fewer words in title, sorted by points).
  - Tests error handling for invalid filter selection.

### `LogEntry` Class

- **Initialization**:
  - Checks if the start time is correctly initialized upon creation.

- **Attribute Handling**:
  - Tests filling attributes (`fillAttribute` method).
  - Tests marking the end of the log (`endLog` method) and calculates elapsed time.

- **Export**:
  - Verifies that `exportLog` method returns the correct log attributes object.

### `Crawler` Class

- **Raw data retrieval**:
  - Tests successful retrieval of raw data.
  - Tests error handling during data retrieval.

- **Entry class**:
  - Tests word counting functionality for titles.
  - Tests error handling for non-string fields.

- **Crawler class**:
  - Tests data scraping functionality:
    - Full body HTML.
    - Short body HTML.
    - Empty body HTML.
  - Tests filtering functionality:
    - Entries longer than 5 words sorted by comments.
    - Entries shorter than or equal to 5 words sorted by points.
    - Handling of empty array of entries.
    - Handling of invalid filter keys.

To run tests:
```bash
npm test
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or feedback, feel free to contact me at [dannyzaffalon@gmail.com].

---

*This README was generated with the help of [ChatGPT](https://github.com/openai/chatgpt).*