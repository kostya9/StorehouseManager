import {cloneDeep} from 'lodash'

export const START_ADD_AREA = 'START_ADD_AREA'
export const CANCEL_ADD_AREA = 'CANCEL_ADD_AREA'
export const ADD_AREA = 'ADD_AREA'
export const REMOVE_AREA = 'REMOVE_AREA'
export const SELECT_AREA = 'SELECT_AREA'
export const SELECT_RESET = 'SELECT_RESET'
export const SET_NAME = 'SET_NAME'

import Area, {AREA_ENTER, AREA_EXIT, AREA_SECTION} from './../domain/area'

export default function areas(state = {areasList: [], selectedId: -1, areaTypesAvailability: {section: true, enter: true, exit: true}}, action) {
    switch(action.type) {
        case ADD_AREA:
            const rectangle = state.addingArea.rectangle;
            const id = state.addingArea.id;
            const type = action.areaType;
            const areaTypesAvailability = {...state.areaTypesAvailability}
            switch(type) {
              case AREA_ENTER: {
                areaTypesAvailability.enter = false;
              } break;
              case AREA_EXIT: {
                areaTypesAvailability.exit = false;
              } break;
            }

            const area = new Area(rectangle, id, type, action.name)
            return {...state, areasList: [...state.areasList, area], areaTypesAvailability: areaTypesAvailability}
        case REMOVE_AREA:
            const index = state.areasList.findIndex(area => area.id == state.selectedId)
            const newAreas = [...state.areasList];
            newAreas.splice(index, 1)
            return {...state, areasList: newAreas, selectedId: -1}
        case SELECT_AREA:
        {
            const id = action.id;
            return {...state, selectedId: id}
        }
        case SELECT_RESET:
            return {...state, selectedId: -1}
        case SET_NAME:
        {
            if(state.selectedId == -1)
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
          let id = 0
          if(state.areasList.length != 0)
          {
            const ids = state.areasList.map((area) => area.id);
            id = Math.max(...ids) + 1;
          }

          if(rectangle == undefined || id == undefined)
            return state;

          const addingArea = {
            rectangle: rectangle,
            id: id
          }
          const newState = {...state, addingArea: addingArea};
          return newState;
        }
        case CANCEL_ADD_AREA: {
          let {addingArea, ...newState} = state;
          return newState;
        }
        default:
            return state
    }
}
