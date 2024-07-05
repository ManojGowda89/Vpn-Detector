import axios from "axios";
export default async function GetIpData(ip){
    localStorage.setItem("ip",ip)
    console.log("api call")
    const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=2fe1ca572b184f3c85ffb16e9838f481&ip=${ip}`)
    return geoResponse.data;
}