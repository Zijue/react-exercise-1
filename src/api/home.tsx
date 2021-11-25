import axios from ".";
export function getSliders() {
    return axios.get('/slider/list');
}