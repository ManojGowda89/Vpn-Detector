import { useEffect, useState } from "react";
import "./App.css";
import Getip from "./data/Getip.jsx";
import GetIpData from "./data/GetIpData.jsx";
import { draft } from "./data/draftData.jsx";

export default function App() {
  const [info, setInfo] = useState(draft);

  useEffect(() => {
    callIP();
  }, []);

  async function callIP() {
    try {
      const ip = await Getip();
      if (ip === localStorage.getItem("ip")) {
        setInfo(JSON.parse(localStorage.getItem("data")));
        console.log("local call")
        return;
      }

      const {
        isp,
        country_name: country,
        state_prov: region,
        city,
        country_code2: country_code,
        latitude: geolocationLat,
        longitude: geolocationLong,
      } = await GetIpData(ip);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude: browserLat, longitude: browserLong } =
              position.coords;

            const usingVPN =
              Math.abs(geolocationLat - browserLat) > 0.1 ||
              Math.abs(geolocationLong - browserLong) > 0.1;

            const newInfo = {
              ip,
              isp,
              country,
              region,
              city,
              country_code,
              geolocationLat,
              geolocationLong,
              browserLat,
              browserLong,
              usingVPN,
            };

            localStorage.setItem("data", JSON.stringify(newInfo));
           
            setInfo(newInfo);
          },
          (error) => {
            console.error("Error obtaining geolocation:", error);
            const newInfo = {
              ip,
              isp,
              country,
              region,
              city,
              country_code,
              geolocationLat,
              geolocationLong,
              browserLat: "Unavailable",
              browserLong: "Unavailable",
              usingVPN: "Unable to determine",
            };

            setInfo(newInfo);
            localStorage.setItem("data", JSON.stringify(newInfo));
          
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        const newInfo = {
          ip,
          isp,
          country,
          region,
          city,
          country_code,
          geolocationLat,
          geolocationLong,
          browserLat: "Unsupported",
          browserLong: "Unsupported",
          usingVPN: "Unable to determine",
        };

        setInfo(newInfo);
        localStorage.setItem("data", JSON.stringify(newInfo));
    
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>IP Information</h1>
      {localStorage.getItem("data") ? (
        <>
          <p>IP: {info.ip}</p>
          <p>ISP: {info.isp}</p>
          <p>Country: {info.country}</p>
          <p>Region: {info.region}</p>
          <p>City: {info.city}</p>
          {/* <p>Country Code: {info.country_code}</p>
          <p>Geolocation Latitude: {info.geolocationLat}</p>
          <p>Geolocation Longitude: {info.geolocationLong}</p>
          <p>Browser Latitude: {info.browserLat}</p>
          <p>Browser Longitude: {info.browserLong}</p> */}
          <p>
            Using VPN:{" "}
            {info.usingVPN === null ? "Checking..." : info.usingVPN ? "Yes" : "No"}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
