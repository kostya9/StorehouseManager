import {cloneDeep} from 'lodash'

export const ADD_AREA = 'ADD_AREA'
export const REMOVE_AREA = 'REMOVE_AREA'
export const SELECT_AREA = 'SELECT_AREA'
export const SELECT_RESET = 'SELECT_RESET'
export const SET_NAME = 'SET_NAME'

import Area from './../domain/area'

export default function areas(state, action) {
    switch(action.type) {
        case ADD_AREA:
            const {currentDrawFigure, ...newState} = state;
            if(currentDrawFigure == undefined || action.id == undefined)
              return state;
            if(Math.abs(currentDrawFigure.height) < 10 || Math.abs(currentDrawFigure.width) < 10)
              return newState;
            const addedDrawFigure = new Area(currentDrawFigure, action.id)
            return {...newState, areas: [...newState.areas, addedDrawFigure]}
        case REMOVE_AREA:
            const index = state.areas.findIndex(area => area.id == state.selectedId)
            const newAreas = [...state.areas];
            newAreas.splice(index, 1)
            return {...state, areas: newAreas, selectedId: -1}
        case SELECT_AREA:
            const id = action.id;
            return {...state, selectedId: id}
        case SELECT_RESET:
            return {...state, selectedId: -1}
        case SET_NAME:
            if(state.selectedId == -1)
              return;
            const areaIndex = state.areas.findIndex((area) => area.id == state.selectedId);
            const area = state.areas[areaIndex];
            const newArea = cloneDeep(area);
            newArea.name = action.name;
            var newAreas = [...state.areas];
            newAreas.splice(areaIndex, 1, newArea);
            return {...state, areas: newAreas}


        default:
            return state
    }
}
