import AreasApi from "../api/areas";
import {LOAD_AREAS, ADD_AREA, REMOVE_AREA, UPDATE_AREA} from "../reducers/areas";
import Area from "../domain/area";
import {notificationFailure} from "./notification";

function loadAreasSuccess(areas) {
    return {type: LOAD_AREAS, areas: areas}
}

function addAreaSuccess(area) {
    return {type: ADD_AREA, area: area}
}

function removeAreaFromState() {
    return {type: REMOVE_AREA}
}

function updateAreaSuccess(area) {
    return {
        type: UPDATE_AREA,
        area: area
    }
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
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function addArea(rectangle, type, name) {
    const addingArea = new Area(rectangle, 0, type, name)
    return (dispatch) => {
        return AreasApi.addArea(addingArea)
            .then((area) => {
                dispatch(addAreaSuccess(area))
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>
                    dispatch(notificationFailure(msg))
                );
            });
    }
}

export function updateArea(id, name, type, temperature, humidity, volume) {
    return (dispatch) => {
        return AreasApi.updateArea(id, name, type, temperature, humidity, volume)
            .then((area) => {
                dispatch(updateAreaSuccess(area))
            })
            .catch((msgPromise) => {
                msgPromise.then((msg) =>{
                    dispatch(notificationFailure(msg));
                    dispatch(loadAreas());
                    }
                );
            });
    }
}