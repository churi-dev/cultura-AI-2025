import dayjs from "dayjs";
import { supabase } from "../db/supabaseClient.js";
import { getQlooContentData } from "./qloo.service.js";
import { getResumeGemini } from "./gemini.service.js";

export async function getCulturaDay(pais, ciudad) {
    const fecha = dayjs().format('YYYY-MM-DD');

    // 1. buscar si existe en bd supabase
    const { data: exist, error } = await supabase
    .from('cultura')
    .select('*')
    .eq('pais', pais)
    .eq('ciudad', ciudad)
    .eq('fecha', fecha)
    .single();

    if (exist) return exist;


    // 2. si no existe, registramos nuevo dato
    const qlooData = await getQlooContentData(pais);
    console.log('Qloo data:', qlooData);
    const resumen = await getResumeGemini(pais, ciudad, qlooData);

    const newData = {
        pais,
        ciudad,
        fecha,
        musica: qlooData.musica,
        moda: qlooData.moda,
        libros: qlooData.libros,
        peliculas: qlooData.peliculas,
        resumen
    };

    // 3. insertamos los datos en supabase
    const { data: saved} = await supabase
    .from('cultura')
    .insert([newData])
    .select()
    .single();

    return saved;
}