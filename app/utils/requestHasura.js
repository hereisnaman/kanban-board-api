import path from 'path';

export const requestHasura = query => {
  return fetch(process.env.HASURA_URL, {
    method: 'POST',
    body: JSON.stringify(query),
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Access-Key': process.env.HASURA_ACCESS_KEY,
    },
  }).then(response => response.json());
};
