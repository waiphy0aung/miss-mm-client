const url = "https://miss-mm.onrender.com";
// const url = "http://localhost:3002"

async function fetchPostRequest({
	endpoint,
	headers,
	data,
}) {
	const fetchData = await fetch(`${url}${endpoint}`, {
		method: 'POST',
		headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+headers?.xToken })),
		body: JSON.stringify(data),
	});
	return await fetchData.json();
}

async function fetchPutRequest({
	endpoint,
	headers,
	data,
}){
	const fetchData = await fetch(`${url}${endpoint}`, {
		method: 'PUT',
		headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+headers?.xToken })),
		body: JSON.stringify(data),
	});
	return await fetchData.json();
}

async function fetchDeleteRequest({
	endpoint,
	headers,
}){
	const fetchData = await fetch(`${url}${endpoint}`, {
		method: 'Delete',
		headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+headers?.xToken })),
	});
	return await fetchData.json();
}

async function fetchGetRequest({
	endpoint,
	headers,
}){
	const fetchData = await fetch(`${url}${endpoint}`, {
		method: 'GET',
		headers: JSON.parse(JSON.stringify({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+headers?.xToken })),
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