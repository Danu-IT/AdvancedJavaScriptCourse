export function service(url){
  return fetch(url)
  .then((data) => data.json());
}

export function servicePost(url, body){
  return fetch(url, {
    method: 'POST',
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
}

export function serviceDelete(url, id) {
  return fetch(`${url}/:${id}`, {
    method: 'DELETE',
    id: JSON.stringify(id)
  })
}
