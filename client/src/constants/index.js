export const API = "https://boilerplate-server.herokuapp.com";

// export const API = "http://127.0.0.1:5000";

export function post(url, params) {
  const formData = new FormData();

  for (const key in params) {
    formData.append(key, params[key]);
  }

  const data = { method: "POST", body: formData };

  return new Promise(async function(resolve, reject) {
    try {
      const request = await fetch(`${API}${url}`, data);
      const response = await request.json();
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
}
