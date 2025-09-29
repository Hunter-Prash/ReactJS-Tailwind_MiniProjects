import axios from "axios";

const BASE_URL='https://jsonplaceholder.typicode.com/posts';

const fetchData=async()=>{
    try{
        const resp= await axios.get(BASE_URL);
        return resp.data;
    }
    catch{
        console.log('ERROR fetching data....' );
        return [];
    }
}

export default fetchData;
