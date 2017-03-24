import reduce from './../reducers/reducer'
describe('Return correct initial state', () => {
  it('Should return correct initial state', () => {
    const beforeState = {};
    const action = {
      type: 'TEST_ACTION'
    }
    const afterState = {
      width: 300,
      height: 300,
      areas: [],
      drawing: false
    }
    expect(reduce(beforeState, action)).toEqual(afterState)
  })
})
