import axios from "axios";

const BASE_URL='https://api.openweathermap.org/data/2.5/weather?'

const api_key='667cf26d9dbb6213e4a54e70c203e28e'

const fetchApi = async (endpoint) => {
    try {
        const url = `${BASE_URL}q=${endpoint}&appid=${api_key}`;
        const resp = await axios.get(url);
        return resp;
    } catch (error) {
        console.log("ERROR FETCHING....", error);
        return [];
    }
}

export default fetchApi;