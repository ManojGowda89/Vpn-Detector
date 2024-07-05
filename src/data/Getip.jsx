import axios from "axios";

export default async function Getip() {
  const ipResponse = await axios.get("https://api.ipify.org?format=json");
  const { ip } = ipResponse.data;
  return ip;
}
