import axios from ".";

export function validate() {
    return axios.get('/user/validate');
}