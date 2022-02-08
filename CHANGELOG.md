This CHANGELOG file contains the main features and changes applied to the application, following the main specs specified in the instructions of the README file.

---

TODO:

- add unit test for Context providers
- separate Bill management from Order Context: add a specific Context provider for Bill (it only needs to know the total price, it can be obtained dispatching single actions for each selected item of the menu list with the respective price)
- validationRules.minCoursesPerDiner is not optimal: refactor the entire Menu in order to manage the order separately for the Diners in order to allow a better management and application for the restaurant rules
- use MockProvider in tests in order to have a general "render" function to be used in Unit Tests

### v0.1.0

Achievements:

- first MVP: resolves the instructions and main specs of the project
- all the restaurant rules are applied
  - some of them can be improved: one rule ("Each person must have at least two courses") needs to be better designed, since now it has not optimal configuration for more than 2 diners
  - rules configuration can be fetched from server, based on Restaurant
  - rules can be dynamically setup in order to apply them based on Restaurant
- very little UI style has been applied: personal choice, to give more priority and importance to business logic (based on specs) and unit tests

TODO/To Improve (in order of importance):

- more unit tests, especially for the context Order reducer and the Order provider (most important business components), and Menu, Course and Dish components (most important components in terms of UX/UI)
- improve rules and how rules are applied in the OrderValidation provider
- improve design based on rules/configurations per restaurant
- use a UX/UI library to create a more appealing and user friendly UI (i.e. MaterialUI React components library)
- localisation is now only mocked in the app: it can be effectively applied with a library (i.e. i18next)

Issues:

- I was not able to setup webpack in order to manage css files (hence I applied some inline styles) in an affordable small amount of time
- I tried to create a general render wrapper for the Context Providers, in order to be used in Unit Tests: done and completed but it was not working as expected, still to understand why

---

### v0.0.1

Project setup initialisation:

- ESLint and Prettier setup, including Visual Studio Code settings and extensions: fix and prettify on file save for main .js and .jsx files
- Jest setup for Unit Testing with React Testing Library
- first simple basic Unit Test
- ready to start implementing features accordingly with instructions and design specs
