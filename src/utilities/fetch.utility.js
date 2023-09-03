// const fetchUrl = "https://miss-mm.onrender.com";
const fetchUrl = "https://miss-universe-mm.onrender.com/api";
// export const fetchUrl = "http://localhost:8000/api"

async function fetchPostRequest({
  endpoint,
  headers,
  data,
  isFormData
}) {
  const fetchData = isFormData ? await fetch(`${fetchUrl}${endpoint}`, {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + headers?.xToken },
    body: data,
  }) : await fetch(`${fetchUrl}${endpoint}`, {
    method: 'POST',
    headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + headers?.xToken })),
    body: JSON.stringify(data),
  });
  return await fetchData.json();
}

async function fetchPutRequest({
  endpoint,
  headers,
  data,
  isFormData
}) {
  const fetchData = isFormData ? await fetch(`${fetchUrl}${endpoint}`, {
    method: 'PUT',
    headers: { 'Authorization': 'Bearer ' + headers?.xToken },
    body: data,
  }) : await fetch(`${fetchUrl}${endpoint}`, {
    method: 'PUT',
    headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + headers?.xToken })),
    body: JSON.stringify(data),
  });
  return await fetchData.json();
}

async function fetchDeleteRequest({
  endpoint,
  headers,
}) {
  const fetchData = await fetch(`${fetchUrl}${endpoint}`, {
    method: 'Delete',
    headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + headers?.xToken })),
  });
  return await fetchData.json();
}

async function fetchGetRequest({
  endpoint,
  headers,
}) {
  const fetchData = await fetch(`${fetchUrl}${endpoint}`, {
    method: 'GET',
    headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + headers?.xToken })),
  });
  return await fetchData.json();
}

const fetchUtilities = {
  get: fetchGetRequest,
  post: fetchPostRequest,
  put: fetchPutRequest,
  delete: fetchDeleteRequest,
};

export default fetchUtilities;
