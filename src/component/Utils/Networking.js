export const serverIp = '192.168.0.105:3000';

export function timeoutPromise(timeout, err, promise) {
    return new Promise(function(resolve,reject) {
        promise.then(resolve,reject);
        setTimeout(reject.bind(null,err), timeout);
    });
}
export async function login(username, password) {
    return await timeoutPromise(100, new Error('Timed Out!'), fetch('http://' + serverIp + '/api/auth/login', {
        method: 'POST',
        timeout: 200,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
        }),
    }));
}

export async function getItems(token) {
    return await timeoutPromise(100, new Error('Timed Out!'), fetch('http://' + serverIp + '/api/item/', {
        method: 'GET',
        timeout: 200,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            "Authorization": " Bearer "+token,
        },
    }));
}