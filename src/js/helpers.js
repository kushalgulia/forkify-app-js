import { TIMEOUT_SEC } from './config';

/**
 * @param {number} s seconds
 * @returns rejectd promise after s seconds
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * combines fetch and json into a single promise
 * @param {string} url to be fetched
 * @returns promise with the result of json
 */
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} Code:${res.status}`);
    return data;
  } catch (err) {
    throw err; //reaches model
  }
};
