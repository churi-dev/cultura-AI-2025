import { getCulturaDay } from "../services/cultura.service.js";

export async function getCultura(req, res) {
    const { pais, ciudad } = req.query;

    if (!pais || !ciudad) {
        return res.status(400).json({ error: 'Faltan parámetros: pais y ciudad son requeridos.' });
    }

    try {
        const data = await getCulturaDay(pais, ciudad);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos culturales.' });  
    }
}