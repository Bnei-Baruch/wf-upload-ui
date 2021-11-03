export const getData = (path, cb) => fetch(`${path}`, {
    headers: {'Content-Type': 'application/json'}
})
    .then((response) => {
        if (response.ok) {
            return response.json().then(data => cb(data));
        }
    })
    .catch(ex => console.log(`get ${path}`, ex));
