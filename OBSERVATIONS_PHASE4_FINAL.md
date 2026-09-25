# [BookShelf]

## Setup

- **Problem:** A small API for adding, viewing, updating, deleting, and
  searching books.
- **Stack:** Java + Spring Boot
- **IDE Tool:** Android Studio
- **CLI Tool:** Copilot CLI

## 1. How AI Helped

### Planning (IDE)

The planning step helped set out the main parts of the project before coding.
It listed the book fields, allowed statuses, API routes, validation rules, and
test cases. It also mentioned cases like blank search text, invalid ratings,
and completion dates.

The plan was actually more complete than the first version of the code. The
first implementation missed search, some validation rules, the full statistics
response, and part of the planned repository structure. The plan was useful
later because it made these missing parts easy to spot.

### Building (CLI Agent)

The CLI agent created the Spring Boot project and the main files for the
controller, service, repository, model, request object, enum, error handler,
and tests. The basic CRUD operations worked. The repository also used the
planned `ConcurrentHashMap` and `AtomicLong`.

The commits show the work by phase:

- `6c9bcdf phase 1 planning architecture`
- `9f0aabe phase 2 implementation`
- `6fac42a phase 3 testing`

The testing phase also changed `BookController.java` and `BookService.java`
because search was missing. This was related to the test issue, but it was
still a production-code change and not only a test change.

### Testing

The CLI agent added nine MockMvc tests. The first run failed because some test
data used `AVAILABLE`, but the application only supports `READING`,
`COMPLETED`, and `WISHLIST`. The test data was changed to `READING`.

Later testing showed that search was not working yet. Search was added to the
controller and service, and a search such as `Clean` could then find
`Clean Code`. Four iterations were recorded for the testing work. The latest
reported Maven output still had one statistics test failure, so the final
all-passing result was not confirmed in that iteration.

## 2. IDE vs CLI: What I Noticed

|  | IDE Inline Chat | CLI/TUI Agent |
|---|---|---|
| **Good for** | Planning the API and thinking through the rules before coding. | Creating files quickly, adding code, adding tests, and running Maven. |
| **Context it had** | Kept the full plan in view more easily. | Had the files and terminal output, but sometimes focused only on the immediate test request. |
| **Accuracy** | The plan was detailed and clear. | The first code version got the basic CRUD work right but missed several planned features. |
| **Diff cleanliness** | The planning work did not add code changes. | The source changes were understandable, but generated files under `target/` made the diff larger than needed. |

## 3. Diff Review

Yes, files outside a strict test-writing change were touched. The testing
commit changed:

- `src/main/java/com/bookshelf/book/BookController.java`
- `src/main/java/com/bookshelf/book/BookService.java`

These changes added the missing search route and search method. They were
connected to the planned API, so they were not random refactoring, but they
were still production changes made during testing.

No random dependencies were added. The `pom.xml` contains the expected Spring
Boot web, validation, and test dependencies. No new library was added just to
make the tests pass.

The main scope problem was the committed Maven output under `target/`. This
included compiled class files, Maven status files, and Surefire reports. These
files were not needed in the source repository and should normally be ignored.

No frontend, database, login system, or other unrelated feature was added.

## 4. What Worked and What Surprised Me

### Matched

- Java and Spring Boot were used as planned.
- The code was split into controller, service, repository, model, request, and
  error-handling parts.
- The in-memory repository used a concurrent map and atomic IDs.
- The basic CRUD API worked with curl and MockMvc.

### Surprised

- The first implementation was mostly basic CRUD even though the plan had more
  detailed search, statistics, and validation requirements.
- The tests used `AVAILABLE` even though that status was not in the enum.
- Search was found to be missing only during the end-to-end checks.
- Production files were changed during the testing phase.
- The last reported test result still needed one clean, fully verified Maven
  run.
