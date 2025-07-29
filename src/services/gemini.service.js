export async function getResumeGemini(pais, ciudad, qlooData) {

    return `Hoy en ${ciudad}, ${pais}, se celebra una rica diversidad cultural. Escucha música como ${qlooData.musica[0]}, viste al estilo ${qlooData.moda[0]} y disfruta de libros como "${qlooData.libros[0]}" y películas como "${qlooData.peliculas[0]}".`;
}