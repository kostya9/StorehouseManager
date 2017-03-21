export const ADD_AREA = 'ADD_AREA'
export const REMOVE_AREA = 'REMOVE_AREA'

export default function areas(state, action) {
    if(state.areas == undefined)
        state = {...state, areas: []}
    switch(action.type) {
        case ADD_AREA: 
            const {currentDrawFigure, ...newState} = state;
            currentDrawFigure.id = action.id
            return {...newState, areas: [...newState.areas, currentDrawFigure]}
        case REMOVE_AREA:
            const index = state.areas.find({id: action.id}) 
            const length = state.areas.length
            const newAreas = state.areas.splice(0, index, index + 1, length)
            return {...state, areas: newAreas}
        default:
            return state
    }
}