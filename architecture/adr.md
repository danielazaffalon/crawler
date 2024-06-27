# Architectural Decision Records (ADRs)

## 1. Use of a Modular Architecture

### Context
To build a scalable and maintainable web crawler, it was essential to organize the codebase into logical modules.

### Decision
We have chosen to implement a modular architecture, dividing the functionality into distinct modules:

- `scraping/scraping.js`: Handles web scraping.
- `log/log.js`: Manages logging operations.
- `readLine/readLine.js`: Facilitates user input.
- `storageService/storageService.js`: Interacts with the storage service.
- `config.js`: Manages configuration settings.

### Consequences
- **Pros**:
  - Enhances code readability and maintainability.
  - Allows for easier testing and debugging.
  - Facilitates future enhancements and scalability.

- **Cons**:
  - Initial setup may require more effort and planning.

---

## 2. Logging and Error Handling

### Context
It's essential to log the application’s operations and errors for debugging and analysis purposes.

### Decision
We introduced a logging mechanism using the `LogEntry` class. This class captures various attributes of the operations, such as start and end timestamps, requested filter, number of crawled and filtered entries, and any errors encountered.

### Consequences
- **Pros**:
  - Provides a detailed record of the application's operations.
  - Aids in debugging and identifying issues.

- **Cons**:
  - Adds additional complexity to the codebase.

---

## 3. Data Storage Using a Storage Service

### Context
To persist logs and data for further analysis, a reliable storage solution is needed.

### Decision
We implemented the `StorageService` class to interact with Firebase Firestore. This service handles the insertion of log entries into the Firestore database.

### Consequences
- **Pros**:
  - Ensures data is persistently stored.
  - Allows for future data retrieval and analysis.

- **Cons**:
  - Adds dependency on an external storage service.
  - Requires proper configuration and setup of Firestore.

---

## 4. User Input for Filtering Parameters

### Context
The web crawler needs to filter and sort the scraped data based on user-defined parameters.

### Decision
We used the `getParams` function from the `readLine` module to prompt the user for filtering parameters. These parameters include the filter key, word limit, sorting key, and sorting order.

### Consequences
- **Pros**:
  - Provides flexibility for the user to define filtering criteria.
  - Enhances the usability of the crawler.

- **Cons**:
  - Introduces dependency on synchronous user input, which may not be ideal for automated environments.

---

## 5. Graceful Error Handling and Process Termination

### Context
The application needs to handle errors gracefully and ensure that the process exits cleanly.

### Decision
We wrapped the main execution logic in a try-catch block to capture and log any errors. After logging, we ensure the process exits cleanly.

### Consequences
- **Pros**:
  - Prevents the application from crashing unexpectedly.
  - Ensures all errors are logged for further analysis.

- **Cons**:
  - Adds complexity to the main execution logic.

---

## 6. Web Scraping with Cheerio

### Context
Efficient and reliable web scraping is essential for the crawler to fetch and process data from Hacker News.

### Decision
We selected Cheerio, a fast and flexible library, to parse and extract data from the HTML DOM.

### Consequences
- **Pros**:
  - Simplifies the process of extracting data from HTML.
  - Provides a jQuery-like API for easier manipulation.

- **Cons**:
  - Introduces dependency on an external library.

---

## 7. Configuration Management

### Context
Sensitive data such as API keys and project IDs should not be hardcoded within the application.

### Decision
We utilized the `dotenv` library to manage configuration settings, loading environment variables from a `.env` file.

### Consequences
- **Pros**:
  - Enhances security by keeping sensitive data out of the source code.
  - Simplifies configuration management across different environments.

- **Cons**:
  - Requires additional setup and understanding of environment variables.

---

## 8. Exit on Completion

### Context
To ensure that the application does not hang after completing its operations, it is necessary to exit the process.

### Decision
We explicitly call `process.exit(0)` after completing the main operations and logging to ensure the application exits cleanly.

### Consequences
- **Pros**:
  - Prevents the application from running indefinitely.
  - Ensures all resources are released properly.

- **Cons**:
  - Forces the application to terminate, which may not be suitable for long-running processes.

---

## 9. Testing

### Context
Testing is essential to ensure the correctness and reliability of the application.

### Decision
We created a `tests` directory to hold all test files and utilized a testing framework (e.g., Jest) to write and run tests for various modules.

### Consequences
- **Pros**:
  - Enhances the reliability of the application.
  - Facilitates early detection of bugs and issues.

- **Cons**:
  - Requires additional effort to write and maintain tests.
  - Increases the overall complexity of the project setup.

---

*This adr.md file was generated with the help of [ChatGPT](https://github.com/openai/chatgpt).*