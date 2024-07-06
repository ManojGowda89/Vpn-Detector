import React, { useState, useEffect } from "react";
import "./App.css";
import Getip from "./data/Getip";
import GetIpData from "./data/GetIpData";
import { draft } from "./data/draftData";
import { getLocation } from "./data/Getlocation";
import Display from "./Display/Display";
export default function App() {
  const [info, setInfo] = useState(draft);
  const [fullData, setFullData] = useState(null);
  const [usingVpn, setUsingVpn] = useState(false);
  const [connectionType, setConnectionType] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const storedIP = sessionStorage.getItem("ip");
        const storedData = sessionStorage.getItem("data");
        const storedUsingVpn = sessionStorage.getItem("usingVpn");
        const storedConnectionType = sessionStorage.getItem("connectionType");

        const ip = await Getip();
        if (ip === storedIP ) {
          console.log("Same IP");
          const parsedData = JSON.parse(storedData);
          setFullData(parsedData);
          setUsingVpn(storedUsingVpn === "true");
          setConnectionType(storedConnectionType || "Unknown");
          return;
        }

        const data = await GetIpData(ip);
        const locationData = await getLocation();

        setFullData({
          data,
          locationData
        });

        sessionStorage.setItem("ip", ip);
        sessionStorage.setItem("data", JSON.stringify({ data, locationData }));
        
        const newUsingVpn = checkVpn(data.latitude, data.longitude, locationData.latitude, locationData.longitude);
        setUsingVpn(newUsingVpn);

        const newConnectionType = getConnectionType();
        setConnectionType(newConnectionType);
        
        sessionStorage.setItem("usingVpn", newUsingVpn.toString());
        sessionStorage.setItem("connectionType", newConnectionType);

      } catch (error) {
        console.error("Error fetching IP or location data", error);
      }
    }

    fetchData();
  }, []);

  const checkVpn = (latitude1, longitude1, latitude2, longitude2) => {
    // Compare latitude and longitude with a tolerance level of 1 degree
    const latitudeDiff = Math.abs(latitude1 - latitude2);
    const longitudeDiff = Math.abs(longitude1 - longitude2);

    // If latitude difference is less than 1 degree and longitude difference is less than 1 degree
    if (latitudeDiff < 1 && longitudeDiff < 1) {
      return false; // Not using VPN
    } else {
      return true; // Using VPN
    }
  };

  const getConnectionType = () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return connection ? connection.effectiveType : "Unknown";
  };

  const handleWiFiDisconnect = () => {
    if (connectionType.toLowerCase() === "wifi") {
      return <p>Please disconnect WiFi.</p>;
    }
    return null;
  };

  return(
    <div className="App"> 
    <Display fullData={fullData} connectionType={connectionType} handleWiFiDisconnect={handleWiFiDisconnect} usingVpn={usingVpn} />
    </div>
  )
}
