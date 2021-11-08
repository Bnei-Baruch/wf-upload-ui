export const getData = (path, cb) => fetch(`${path}`, {
    headers: {'Content-Type': 'application/json'}
})
    .then((response) => {
        if (response.ok) {
            return response.json().then(data => cb(data));
        }
    })
    .catch(err => {
        console.error("Can't get configuration from server. Error: " + err);
    });
