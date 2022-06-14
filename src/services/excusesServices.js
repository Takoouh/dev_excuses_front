import axios from "axios";

/**
 * GET /excuses
 * @returns {Promise<Excuse[]>} - return a promise with array of excuses
 */
export const fetchExcuses = () => axios.get("http://localhost:8080/excuses");

/**
 * POST /excuses
 * @param {string} message - new excuse to add
 * @returns {Promise<Excuse[]>} - Add excuse to API pool, and retrieve all excuses
 */
export const addExcuse = (message) =>
  axios.post("http://localhost:8080/excuses", { message });
