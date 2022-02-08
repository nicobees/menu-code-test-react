/**
 * Tests to be run:
 * 1) should display a name and a price
 *  - arrange: set props to be applied to the Dish component
 *  - act: render Dish component with specific props
 *  - assert: getByText() should be visible
 * 2) should display a custom error message if props are not correctly set
 *  - arrange: set undefined props
 *  - act: render Dish component with specific props
 *  - assert: getByText(/error message/) should be visible
 *  !!! This test implies a refactor of the component in order to manage the error message in case of missing or invalid props !!!
 * 3) should display the amount of the Dish coming from the Order provider
 *  - arrange: mock Order provider with a specific amount for the Dish
 *  - act: render Dish component within mocked providers
 *  - assert: getByText or getByRole to check the amount element --> should be visible and equal to the mocked value
 * 4) decrement and increment buttons must be visible
 *  - arrange: set props to be applied to the Dish component
 *  - act: render Dish component with specific props
 *  - arrange: getByRole('button') should be visible (two buttons) and enabled
 * 5) if Dish amount is equal to the Dish stock then the decrement button should be disabled
 *  - arrange: mock Order provider with a specific amount for the Dish
 *  - act: render Dish component within mocked providers
 *  - assert: getByRole('button', {name: /decrement/}) --> should be disabled
 * 6) if the decrement or increment buttons are pressed then a specific action is dispatched
 *  - arrange: mock Order provider for dispatch function, spy on this function
 *  - act: render Dish component within mocked providers, click on decrement or increment button
 *  - assert: dispatch function of mocked provider should be called once, should be called with specific arguments ()
 */
describe('Dish component', () => {
  it('is a placeholder, still to be implemented', () => {
    expect(true).toBe(true);
  });
});
