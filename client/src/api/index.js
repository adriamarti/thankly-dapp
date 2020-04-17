const API_URL = 'http://localhost:4000/api'

/**
 * Native "fetch" function utility
 */
export const customFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`(${response.status}) - ${response.statusText}`, response.status);
  }

  return await response.json();
};

/**
 * http GET request
 */
export const GET = async (path, options) => customFetch(path, {
  method: 'GET',
  ...options,
});

/**
 * http POST request
 */
export const POST = (path, body, options) => customFetch(path, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: { 'Content-Type' : 'application/json' },
  ...options,
});

/**
 * http PUT request
 */
export const PUT = (path, body, options) => customFetch(path, {
  method: 'PUT',
  body: JSON.stringify(body),
  ...options,
});