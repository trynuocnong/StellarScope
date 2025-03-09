import {SAGA_ACTION} from './index.ts';

export const updateNetWork = (state: boolean) => ({
    type: SAGA_ACTION.GLOBAL_ACTION.NETWORK_CHANGE,
    payload: state,
});

export const updateUserName = (s: string) => ({
    type: SAGA_ACTION.GLOBAL_ACTION.NAME_CHANGE,
    payload: s,
});

export const updateAvatar = (path: string) => ({
    type: SAGA_ACTION.GLOBAL_ACTION.AVATAR_CHANGE,
    payload: path,
});
