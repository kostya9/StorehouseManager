/**
 * Created by kostya on 4/9/2017.
 */
import {address} from './apiConstants'
import Area, {AREA_SECTION, AREA_ENTER, AREA_EXIT} from "../domain/area";
import Rectangle from "../domain/rectangle";

function fromServerType(type) {
    switch(type) {
        case 0:
            return AREA_SECTION;
        case 1:
            return AREA_ENTER;
        case 2:
            return AREA_EXIT;
    }
}

function toServerType(type) {
    switch(type) {
        case AREA_SECTION:
            return 0;
        case AREA_ENTER:
            return 1;
        case AREA_EXIT:
            return 2;
    }
}

function fromServerArea(area) {
    const serverRectangle = area.rectangle;
    const rectangle = new Rectangle(serverRectangle.x, serverRectangle.y, serverRectangle.width, serverRectangle.height);
    const type = fromServerType(area.type);
    return new Area(rectangle, area.id, type, area.name);
}

function toServerArea(area) {
    return {
        rectangle: {
            x: area.position.x,
            y: area.position.y,
            width: area.width,
            height: area.height
        },
        type: toServerType(area.type),
        name: area.name
    }
}

const sameOriginOption = { credentials: "same-origin" };

function createPostFetchOptions(body) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return {
        ...sameOriginOption,
        method: "POST",
        body: body,
        headers: headers
    };
}

function createDeleteFetchOptions()
{
    return {
        ...sameOriginOption,
        method: "DELETE"
    }
}

function createPutFetchOptions(body)
{
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return {
        ...sameOriginOption,
        method: "PUT",
        body: body,
        headers: headers
    };
}

export default class AreasApi {
    static getAreas() {
        return fetch(address + '/api/areas', sameOriginOption)
            .then((response) => {
                return response.json();
            })
            .then((areas) => {
                return areas.map(fromServerArea);
            })
    }

    static addArea(area) {
        const serverArea = toServerArea(area)
        return fetch(address + '/api/areas', createPostFetchOptions(JSON.stringify(serverArea)))
            .then((response) => {
                return response.json()
            })
            .then((area) => {
                return fromServerArea(area);
            })
    }

    static removeArea(id) {
        return fetch(address + '/api/areas/' + id, createDeleteFetchOptions())
    }

    static updateArea(id, name, type) {
        return fetch(address + '/api/areas/' + id,
            createPutFetchOptions(JSON.stringify({name: name, type: toServerType(type)})))
            .then((response) => {
                return response.json();
            })
            .then((area) => {
                return fromServerArea(area);
            });
    }
}