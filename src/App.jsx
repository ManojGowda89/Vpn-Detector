import "./App.css";
import "./Loding.css";
import { useEffect, useState } from "react";
import VpnCheck from "mb64-vpn-detect";

export default function App() {
  const [loding, setLoding] = useState(false);
  const [fullData, setFullData] = useState();

  useEffect(() => {
    setLoding(true);
    async function CallThis() {
      const data = await VpnCheck("Manoj@2002");
      if (data) {
        setFullData(data);
        setLoding(false);
      }
    }
    CallThis();
  }, []);

  if (loding) {
    return (
      <div className="App">
        <div className="loading__container">
          <div className="loading__container__circle">
            <div className="loading__container__circle__inner"></div>
          </div>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      {fullData && (
        <div>
          <h2>Full Data</h2>
          <div>
            <h3>IP: {fullData?.data?.ip}</h3>
            <h3>Continent: {fullData?.data?.continent} ({fullData?.data?.continent})</h3>
            <h3>Country: {fullData.data.country} ({fullData.data.country})</h3>
            <h3>ISP: {fullData?.data?.isp}</h3>
            <h3>Currency: {fullData?.data?.currency}</h3>
            {fullData?.status ? <h3>Using VPN</h3> : <h3>Not Using VPN</h3>}
          </div>
        </div>
      )}
    </div>
  );
}
