/**
 * Created by kostya on 4/20/2017.
 */

export const CONFIRM_SHOW = 'CONFIRM_SHOW';
export const CONFIRM_HIDE = 'CONFIRM_HIDE';

export const shared = (state = {confirmButtonShow: false}, action) => {
    switch (action.type) {
        case CONFIRM_SHOW:
            return {...state, confirmButtonShow: true};
        case CONFIRM_HIDE:
            return {...state, confirmButtonShow: false};
        default:
            return state;
    }
}