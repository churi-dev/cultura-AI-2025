import { getGeolocationByIp } from "../services/geolocation.service.js";
import { getClientIp } from "../utils/ip.helper.js";

export async function getGelocation(req, res) {
    try {
        // const ip = getClientIp(req);

        const ip = '179.6.38.22';
    
        const location = await getGeolocationByIp(ip);

        res.json(location);

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            error: "Internal Server Error",
            message: "An error occurred while processing your request."
        });
    }
}