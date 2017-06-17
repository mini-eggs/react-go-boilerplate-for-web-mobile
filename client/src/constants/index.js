export const API = "http://127.0.0.1:5000";

export function post(url, params) {
  const data = { method: "POST", body: JSON.stringify(params) };

  return new Promise(async function(resolve, reject) {
    try {
      const request = fetch(`${API}${url}`, data);
      const response = await request.jons();
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}
