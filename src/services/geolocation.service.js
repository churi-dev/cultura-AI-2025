import axios from "axios";

export async function getGeolocationByIp(ip) {
    const url = `https://ipapi.co/${ip}/json/`;

    const { data } = await axios.get(url);
    
    return {
        ip: ip,
        ciudad: data.city || "Unknown",
        pais: data.country_name || "Unknown",
        region: data.region || "Unknown",   
    };
}