import axios from "axios";

export default async function GetIpData(ip) {
    sessionStorage.setItem("ip",ip)
    console.log("api call");
    const geoResponse = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=2fe1ca572b184f3c85ffb16e9838f481&ip=${ip}`);
    const data = geoResponse.data;

 
    return {
        ip: data.ip,
        continent: {
            code: data.continent_code,
            name: data.continent_name
        },
        country: {
            code2: data.country_code2,
            code3: data.country_code3,
            name: data.country_name,
            official_name: data.country_name_official,
            capital: data.country_capital,
            flag: data.country_flag,
            emoji: data.country_emoji
        },
        state: {
            prov: data.state_prov,
            code: data.state_code
        },
        city: data.city,
        district: data.district,
        latitude: data.latitude,
        longitude: data.longitude,
        isp: data.isp,
        currency: data.currency,
        time : new Date()
    };
}
