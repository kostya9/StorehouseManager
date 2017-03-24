import draw, {START_DRAWING, STOP_DRAWING, MOUSE_MOVE} from './../reducers/draw'


describe('Start and stop drawing', () => {
  it('Should start drawing and create a new drawing object', () => {
    const beforeState = {
          drawing: false,
          areas: [],
          width: 300,
          height: 300}
    const afterState = {
      drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      },
      width: 300,
      height: 300,
      areas: []
    }
    const action = {
      type: START_DRAWING,
      position: {x: 1, y: 1}
    }
    expect(draw(beforeState, action)).toEqual(afterState);
  })

  it('Should start drawing on the bounds if the start position if out of bounds', () => {
    const beforeState = {
      drawing: false,
      width: 300,
      height: 300
    }
    const action = {
      type: START_DRAWING,
      position: {x: 400, y: 400}
    }

    const afterState = {
      drawing: true,
      currentDrawFigure: {
        position: {x: 300, y: 300},
        width: 0,
        height: 0
      },
      width: 300,
      height: 300
    }
    expect(draw(beforeState, action)).toEqual(afterState);
  })

  it('Should start drawing and reset the previous drawing object', () => {
    const beforeState = {
      drawing: false,
      currentDrawFigure: {
        position: {x: 3, y: 1},
        width: 4,
        height: 11
      },
      width: 300,
      height: 300
    }
    const afterState = {
      ...beforeState,
      drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      }
    }
    const action = {
      type: START_DRAWING,
      position: {x: 1, y: 1}
    }
    expect(draw(beforeState, action)).toEqual(afterState);
  })

  it('Should stop drawing', () => {
    const beforeState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      }
    }
    const afterState = {drawing: false,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      }
    }
    const action = {
      type: STOP_DRAWING
    }
    expect(draw(beforeState, action)).toEqual(afterState);
  })
})
describe('mouse move', () => {
  it('Should change width and height only if drawing is true', () => {
    const beforeState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      }
    }

    const action = {
      type: MOUSE_MOVE,
      newMousePosition: {x: 1, y: 2}
    }

    expect(draw(beforeState, action)).not.toEqual(beforeState)

    beforeState.drawing = false;

    expect(draw(beforeState, action)).toEqual(beforeState)

  })

  it('Should change height and width on positive mouse move', () => {
    const beforeState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      }
    }

    const action = {
      type: MOUSE_MOVE,
      newMousePosition: {x: 2, y: 2}
    }

    const afterState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 1,
        height: 1
      }
    }

    expect(draw(beforeState, action)).toEqual(afterState)
  })

  it('Should change height and width on negative mouse move', () => {
    const beforeState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      }
    }

    const action = {
      type: MOUSE_MOVE,
      newMousePosition: {x: 0, y: 0}
    }

    const afterState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: -1,
        height: -1
      }
    }

    expect(draw(beforeState, action)).toEqual(afterState)
  })

  it('Doesn\'t go outside the bounds right bot', () => {
    const beforeState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      },
      width: 100,
      height: 100
    }

    const action = {
      type: MOUSE_MOVE,
      newMousePosition: {x: 150, y: 150}
    }

    const afterState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 99,
        height: 99
      },
      width: 100,
      height: 100
    }

      expect(draw(beforeState, action)).toEqual(afterState)
  })

    it('Doesn\'t go outside the bounds left top', () => {
    const beforeState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: 0,
        height: 0
      },
      width: 100,
      height: 100
    }

    const action = {
      type: MOUSE_MOVE,
      newMousePosition: {x: -100, y: -100}
    }

    const afterState = {drawing: true,
      currentDrawFigure: {
        position: {x: 1, y: 1},
        width: -1,
        height: -1
      },
      width: 100,
      height: 100
    }

      expect(draw(beforeState, action)).toEqual(afterState)
  })

  it('Does not draw if there will be an obstacle on the right', () => {
    const beforeState = { drawing: true,
    currentDrawFigure: {
      position: {x: 1, y: 1},
      width: 0,
      height: 0
    },
    width: 100,
    height: 100,
    areas: [{
        id: 0,
        position: {x: 3, y: 3},
        width: 100,
        height: 100
      }]
  }

  const action = {
    type: MOUSE_MOVE,
    newMousePosition: {x: 10, y: 10}
  }

  const afterState = {drawing: false,
    currentDrawFigure: {
      position: {x: 1, y: 1},
      width: 0,
      height: 0
    },
    width: 100,
    height: 100,
    areas: [{
        id: 0,
        position: {x: 3, y: 3},
        width: 100,
        height: 100
      }]
  }

  expect(draw(beforeState, action)).toEqual(afterState)
})
it('Does not draw if there will be an obstacle on the left', () => {
  const beforeState = { drawing: true,
  currentDrawFigure: {
    position: {x: 10, y: 10},
    width: 0,
    height: 0
  },
  width: 100,
  height: 100,
  areas: [{
      id: 0,
      position: {x: 3, y: 3},
      width: 100,
      height: 100
    }]
}

const action = {
  type: MOUSE_MOVE,
  newMousePosition: {x: 1, y: 10}
}

const afterState = {drawing: false,
  currentDrawFigure: {
    position: {x: 10, y: 10},
    width: 0,
    height: 0
  },
  width: 100,
  height: 100,
  areas: [{
      id: 0,
      position: {x: 3, y: 3},
      width: 100,
      height: 100
    }]
}

expect(draw(beforeState, action)).toEqual(afterState)
})

// TODO: think about sticking to the nearest

})
