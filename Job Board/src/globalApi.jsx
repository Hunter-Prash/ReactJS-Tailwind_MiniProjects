// fetchData.js
import axios from "axios";

const BASE_URL='https://hacker-news.firebaseio.com/v0';

const fetchData=async (endpoint)=>{
    try{
        const url=`${BASE_URL}${endpoint}`;
        const resp=await axios.get(url);
        const data=resp.data;
        return data;
    }
    catch{
        console.log("ERROR FETCHING DATA....");
    }
}

export default fetchData;



