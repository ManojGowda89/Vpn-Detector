

export default function Display({fullData,connectionType,handleWiFiDisconnect,usingVpn}){


    return (
        <div className="App">
          {fullData && (
            <div>
              <h2>Full Data</h2>
              <div>
                <h3>continent :{fullData.data.continent.name}({fullData.data.continent.code})</h3>
                <h3>Country : {fullData.data. country. name}({fullData.data.country.code2})</h3>
                {/* <h3>Latitude: {fullData.data.latitude}</h3>
                <h3>Longitude: {fullData.data.longitude}</h3> */}
                <h3>Country Flag: <img src={fullData.data.country.flag} alt="Country Flag" /></h3>
                <h3>ISP: {fullData.data.isp}</h3>
                <h3>Currency: {fullData.data.currency.name} ({fullData.data.currency.code}) - {fullData.data.currency.symbol}</h3>
                {/* <h3>Location Latitude: {fullData.locationData.latitude}</h3>
                <h3>Location Longitude: {fullData.locationData.longitude}</h3> */}
                {usingVpn ? <h3>Using VPN</h3> : <h3>Not Using VPN</h3>}
                <h3>Connection Type: {connectionType}</h3>
                {handleWiFiDisconnect()}
              </div>
            </div>
          )}
        </div>
      );



}