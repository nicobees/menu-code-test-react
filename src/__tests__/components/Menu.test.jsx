/**
 * Tests to be run:
 * 1) should display list of Courses and dishes if data from backend is not empty
 *  - arrange: mock apollo provider with mocked returned data, add specific test id (if necessary) to Course and Dish components
 *  - act: render Menu component within mocked providers
 *  - assert: getByRole('heading', {  name: /name of the course/i}) to be visible, getAllByTestId to get Course elements
 *    and Dish elements --> should be defined, should be array not empty
 * 2) should display a Bill card whenever the bill amount is greater than 0
 *  - arrange: mock apollo provider, mock Order provider with bill values (test with 0, test with greater than 0)
 *  - act: render Menu component withing mocked providers
 *  - assert: getByRole or getByTestId to check if Bill card is visible or not, based on mocked value from provider
 * 3) if errors comes from the OrderValidator provider then show list of errors in specific box
 *  - arrange: mock OrderValidator provider injecting a context/state value with errors, mock apollo provider (see MenuContext.test.jsx example),
 *    add specific role or test id to validation errors rendered as <li> elements
 *  - act: render Menu component within mocked providers
 *  - assert: getByText(/Validation errors/) to be defined, getByRole or getByTestId for <li> elements --> should be defined, should be array not empty
 */
describe('Menu component', () => {
  it('is a placeholder, still to be implemented', () => {
    expect(true).toBe(true);
  });
});
