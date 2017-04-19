/**
 * Created by kostya on 4/20/2017.
 */

import {CONFIRM_SHOW, CONFIRM_HIDE} from "../reducers/shared";
export const showConfirmButton = () => {
    return {
        type: CONFIRM_SHOW
    }
};

export const hideConfirmButton = () => {
    return {
        type: CONFIRM_HIDE
    }
}