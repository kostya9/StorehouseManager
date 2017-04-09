import {cloneDeep} from 'lodash'

export const START_ADD_AREA = 'START_ADD_AREA'
export const CANCEL_ADD_AREA = 'CANCEL_ADD_AREA'
export const ADD_AREA = 'ADD_AREA'
export const REMOVE_AREA = 'REMOVE_AREA'
export const SELECT_AREA = 'SELECT_AREA'
export const SELECT_RESET = 'SELECT_RESET'
export const SET_NAME = 'SET_NAME'
export const LOAD_AREAS = 'LOAD_AREAS'

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
        case SET_NAME:
        {
            if(state.selectedId === -1)
              return;
            const areaIndex = state.areasList.findIndex((area) => area.id == state.selectedId);
            const area = state.areasList[areaIndex];
            const newArea = cloneDeep(area);
            newArea.name = action.name;
            var newAreas = [...state.areasList];
            newAreas.splice(areaIndex, 1, newArea);
            return {...state, areasList: newAreas}
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
            return {...state, areasList: action.areas};
        }
        default:
            return state
    }
}
