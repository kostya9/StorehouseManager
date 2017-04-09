import {cloneDeep} from 'lodash'

export const START_ADD_AREA = 'START_ADD_AREA'
export const CANCEL_ADD_AREA = 'CANCEL_ADD_AREA'
export const ADD_AREA = 'ADD_AREA'
export const REMOVE_AREA = 'REMOVE_AREA'
export const SELECT_AREA = 'SELECT_AREA'
export const SELECT_RESET = 'SELECT_RESET'
export const LOAD_AREAS = 'LOAD_AREAS'
export const UPDATE_AREA = 'UPDATE_AREA'

import Area, {AREA_ENTER, AREA_EXIT, AREA_SECTION} from './../domain/area'

export default function areas(state = {areasList: [], selectedId: -1, areaTypesAvailability: {section: true, enter: true, exit: true}}, action) {
    switch(action.type) {
        case ADD_AREA:
            const area = action.area;
            const type = area.type;
            const areaTypesAvailability = {...state.areaTypesAvailability}
            switch(type) {
              case AREA_ENTER: {
                areaTypesAvailability.enter = false;
              } break;
              case AREA_EXIT: {
                areaTypesAvailability.exit = false;
              } break;
            }

            return {...state, areasList: [...state.areasList, area], areaTypesAvailability: areaTypesAvailability}
        case REMOVE_AREA:
            return {...state, selectedId: -1}
        case SELECT_AREA:
        {
            const id = action.id;
            return {...state, selectedId: id}
        }
        case SELECT_RESET:
            return {...state, selectedId: -1}
        case UPDATE_AREA:
        {
            if(state.selectedId === -1)
              return;
            const areaIndex = state.areasList.findIndex((area) => area.id === state.selectedId);
            const area = state.areasList[areaIndex];
            const newArea = action.area;
            const newAreas = [...state.areasList];
            newAreas.splice(areaIndex, 1, newArea);

            const areaTypesAvailability = {section: true, enter: true, exit: true}
            if(newAreas.find((a) => a.type === AREA_ENTER) !== undefined)
                areaTypesAvailability.enter = false;
            if(newAreas.find((a) => a.type === AREA_EXIT) !== undefined)
                areaTypesAvailability.exit = false;
            return {...state, areasList: newAreas, areaTypesAvailability: areaTypesAvailability}
        }
        case START_ADD_AREA: {

          const rectangle = action.rectangle;

          if(rectangle == undefined)
            return state;

          return {...state, addingAreaRectangle: rectangle};
        }
        case CANCEL_ADD_AREA: {
          let {addingAreaRectangle, ...newState} = state;
          return newState;
        }
        case LOAD_AREAS: {
            const newAreas = action.areas;
            const areaTypesAvailability = {section: true, enter: true, exit: true}
            if(newAreas.find((a) => a.type === AREA_ENTER) !== undefined)
                areaTypesAvailability.enter = false;
            if(newAreas.find((a) => a.type === AREA_EXIT) !== undefined)
                areaTypesAvailability.exit = false;
            return {...state, areasList: newAreas, areaTypesAvailability: areaTypesAvailability};
        }
        default:
            return state
    }
}
