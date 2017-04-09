import AreasApi from "../api/areas";
import {LOAD_AREAS, ADD_AREA, REMOVE_AREA} from "../reducers/areas";
import Area from "../domain/area";

function loadAreasSuccess(areas) {
    return {type: LOAD_AREAS, areas: areas}
}

function addAreaSuccess(area) {
    return {type: ADD_AREA, area: area}
}

function removeAreaFromState() {
    return {type: REMOVE_AREA}
}

export function cancelAddArea() {
    return {
        type: CANCEL_ADD_AREA
    }
}

export function loadAreas() {
    return dispatch => {
        return AreasApi.getAreas().then(
            areas => {
                dispatch(loadAreasSuccess(areas))
            }
        )
    }
}

export function removeArea(id) {
    return dispatch => {
        return AreasApi.removeArea(id)
            .then(() => {
                dispatch(removeAreaFromState());
                loadAreas()(dispatch)
            })
    }
}

export function addArea(rectangle, type, name) {
    const addingArea = new Area(rectangle, 0, type, name)
    return (dispatch) => {
        return AreasApi.addArea(addingArea)
            .then((area) => {
                dispatch(addAreaSuccess(area))
            })
    }
}