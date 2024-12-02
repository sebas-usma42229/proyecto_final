import md5 from "md5";

const PUBLIC_KEY = "cd78f572069bbcd6d6b2ce46394871bb"; // Reemplaza con tu clave pública
const PRIVATE_KEY = "575bfd62e5e372844a8b81cafb566d050299e18b"; // Reemplaza con tu clave privada
const BASE_URL = "https://gateway.marvel.com/v1/public";

/**
 * Genera los parámetros de autenticación requeridos por la API de Marvel.
 * - `ts`: Marca de tiempo.
 * - `apikey`: Clave pública.
 * - `hash`: MD5 generado combinando ts, privateKey y publicKey.
 */
const getAuthParams = () => {
  const timestamp = new Date().getTime(); // Timestamp actual
  const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`); // Hash con MD5
  return `ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`;
};

/**
 * Función genérica para realizar solicitudes a la API de Marvel.
 * @param {string} endpoint - Endpoint de la API (por ejemplo, "characters").
 * @returns {Promise<object[]>} - Resultados de la API (array de objetos).
 */
export const fetchMarvelData = async (endpoint, params = {}) => {
    try {
      const urlParams = new URLSearchParams(params).toString();
      const url = `${BASE_URL}/${endpoint}?${getAuthParams()}&${urlParams}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.code !== 200) {
        throw new Error(`Error: ${data.status}`);
      }
  
      return data.data.results; // Devuelve los resultados
    } catch (error) {
      console.error("Error al consultar la API de Marvel:", error);
      return [];
    }
  };
