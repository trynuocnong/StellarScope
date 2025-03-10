import {BASE_URL, URL_VARIANT} from '@env';

export const convertAPI = (path: string) => BASE_URL.concat(`/${path}`);
export const getImage = (date: string, image: string) => {
    const [year, month, day] = date.split(' ')[0].split('-');
    return `${URL_VARIANT}/archive/natural/${year}/${month}/${day}/png/${image}.png`;
};
