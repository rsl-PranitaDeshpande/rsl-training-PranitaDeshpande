# BookShelf API - Implementation Observations

## Phase 2: Scaffolding

### What was implemented

The agent created a working Spring Boot Maven project with the main application
entry point, a `Book` model, `BookRequest` record, `BookStatus` enum, controller,
service, repository, exception handler, README, and one MockMvc integration test.
The repository uses a `ConcurrentHashMap<Long, Book>` and `AtomicLong`, which
matches the Phase 1 decision to use thread-safe in-memory storage and generated
numeric IDs. The service delegates persistence to the repository instead of
managing a collection directly, and the request DTO keeps `id` out of client
input. Basic title, author, and status validation was also added.

`mvn test` passes, but it only runs one test. That test verifies a basic create and
list flow and confirms the application starts.

### Where the implementation followed Phase 1

- The project uses Java 17 and Spring Boot with Maven.
- The application has the planned layered shape: application entry point,
  controller, service, repository, model, request DTO, enum, and exception
  handler.
- Storage is in memory and uses `ConcurrentHashMap` plus `AtomicLong`.
- `BookStatus` contains `READING`, `COMPLETED`, and `WISHLIST`.
- `BookRequest` does not accept an ID and uses Bean Validation for required title,
  author, and status fields.
- CRUD endpoints were started, and the controller delegates to the service.

### Where it wandered from the Phase 1 plan

The scaffolding is therefore **partially aligned, not an accurate implementation
of the full Phase 1 plan**. The main deviations are:

| Phase 1 requirement | Observed implementation |
|---|---|
| Endpoints use `/books` | All endpoints use `/api/books`. |
| `POST /books` returns `201 Created` | Create returns the default `200 OK`. |
| Search by partial title or author at `/books/search` | No search endpoint or service method exists. |
| Filtering by both `genre` and `status` | Only status filtering is implemented; genre filtering is absent. |
| `/books/stats` returns total, status counts, average rating, and monthly completion counts | Stats only returns a flat map of counts by status. |
| Ratings are validated from 1 through 5 | No rating range validation exists. |
| Completed books require `dateCompleted` | No cross-field validation exists. |
| Reading and wishlist books reject `dateCompleted` | No such validation exists. |
| Completion dates cannot be in the future | No date validation exists. |
| Invalid enum/query input has a consistent `400` response, including `ProblemDetail` behavior | The handler only covers `MethodArgumentNotValidException`; malformed enum and other conversion errors are not handled as planned. |
| Missing book IDs raise the planned consistent not-found error response | The controller returns `404`, but no shared not-found error body or handler was added. |
| Repository interface plus `InMemoryBookRepository` implementation | A single concrete `BookRepository` class was created instead. This preserves the storage choice but loses the planned abstraction boundary. |
| At least five API tests covering success and edge cases | Only one test exists, covering create and list. No tests cover search, filters, validation edge cases, update, delete, not-found behavior, or statistics. |

### Assessment

The agent did not completely wander off track: it established the intended
technology, basic domain model, layering, and concurrency-safe in-memory
scaffolding. However, it stopped at a minimal CRUD prototype and did not carry
through the detailed Phase 1 contract. The omissions are concentrated in the
behavior that made the plan more than a basic CRUD exercise—search, combined
filtering, complete statistics, cross-field/date/rating validation, standardized
error handling, and the planned test coverage. Phase 2 should be considered
**partially successful scaffolding with significant requirements drift**, not a
faithful execution of Phase 1.
