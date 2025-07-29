import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const QLOO_API_URL = process.env.QLOO_API_URL;
const QLOO_API_KEY = process.env.QLOO_API_KEY;


async function consultQlooApi(tipo, pais) {
    const entity = {
        movie: 'urn:entity:movie',
        artist: 'urn:entity:artist',
        book: 'urn:entity:book',
        brand: 'urn:entity:brand'
    }

    const url = `${QLOO_API_URL}/v2/insights`;
    const params = {
        'filter.type': entity[tipo],
        'filter.location.query': pais,
        limit: 10
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'X-Api-Key': QLOO_API_KEY
            },
            params,
        });
        const results = response.data?.results?.entities || [];
        console.log(results);

        return results.map(item => item.name).filter(Boolean);

    } catch (err) {
        console.error(`Error en Qloo para ${tipo}:`, err.response?.data || err.message);
        return [];
    }
}

//console.log(consultQlooApi("movie", "peru"));

/**
 * 
 * @param {string} pais 
 * @returns {Promise<{ musica: string[], moda: string[], libros: string[], peliculas: string[]}>}
 */
export async function getQlooContentData(pais) {
    const [ musica, moda, libros, peliculas ] = await Promise.all([
        consultQlooApi('artist', pais),
        consultQlooApi('brand', pais),
        consultQlooApi('book', pais),
        consultQlooApi('movie', pais)
    ]);
    return {
        musica,
        moda,
        libros,
        peliculas,
    };
}

console.log(getQlooContentData("peru"));