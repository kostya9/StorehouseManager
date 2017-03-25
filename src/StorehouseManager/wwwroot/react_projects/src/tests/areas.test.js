import areas, {ADD_AREA, REMOVE_AREA, SELECT_AREA, SELECT_RESET} from './../reducers/areas'

describe('Adding and removing draw figures', () => {
  it('Adds new area', () => {
        const beforeState = {drawing: false,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      },
      width: 100,
      height: 100
    }

    const action = {
      type: ADD_AREA,
      id: 1
    }

    const afterState = {drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
        }]
    }
    expect(areas(beforeState, action)).toEqual(afterState)
  })

  it('Removes an area by id', () => {
    const beforeState = {drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
    },
    {
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 2
        }]
    }
    const action = {
      type: REMOVE_AREA,
      id: 2
    }

    const afterState = {drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
        }]
    }
  })

  it('Selects the area', () => {
    const beforeState = {
      selectedId: 0,
      drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
    },
    {
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 2
        }]
    }
    const action = {
      type: SELECT_AREA,
      id: 2
    }

    const afterState = {selectedId: 2,
      drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
      },
        {
            position: {x: 1, y: 1},
            width: 0,
            height: 0,
            id: 2
            }]
    }

    expect(areas(beforeState, action)).toEqual(afterState)
  })

  it('Resets the selection', () => {
    const beforeState = {
      selectedId: 0,
      drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
    },
    {
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 2
        }]
    }
    const action = {
      type: SELECT_RESET
    }

    const afterState = {selectedId: -1,
      drawing: false,
      width: 100,
      height: 100,
      areas : [{
        position: {x: 1, y: 1},
        width: 0,
        height: 0,
        id: 1
      },{
            position: {x: 1, y: 1},
            width: 0,
            height: 0,
            id: 2
            }]
    }
    expect(areas(beforeState, action)).toEqual(afterState)
  })
})
