const URL = import.meta.env.VITE_BACKEND_URL;

export const signup = (data) => {
    return fetch(`${URL}/api/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const signin = (data) => {
    return fetch(`${URL}/api/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

export const userinfo = (data) => {
    return fetch(`${URL}/api/user/userinfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}