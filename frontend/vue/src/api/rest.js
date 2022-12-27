const BASE_URL = 'https://e45909da-a380-4077-82cf-b086904e0c2b.mock.pstmn.io';

async function request(url, method = 'GET', body) {
  try {
    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function findAllTaks() {
  const { data } = await request(`${BASE_URL}/task`);
  return data;
}

export async function findTaskById(id) {
  const { data } = await request(`${BASE_URL}/task/${id}`);
  return data;
}

export async function createTask(payload) {
  const { data } = await request(`${BASE_URL}/task`, 'POST', payload);
  return data;
}

export async function updateTaskById(id, payload) {
  const { data } = await request(`${BASE_URL}/task/${id}`, 'PUT', payload);
  return data;
}

export async function deleteTaskById(id) {
  const { data } = await request(`${BASE_URL}/task/${id}`, 'DELETE');
  return data;
}
