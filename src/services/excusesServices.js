import axios from "axios";

/**
 * GET /excuses
 * @returns {Promise<Excuse[]>} - return a promise with array of excuses
 */
export const fetchExcuses = () => axios.get("http://localhost:8080/excuses");
