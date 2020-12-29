export const baseUrls = {
    development: 'http://localhost:1000',
    production: 'https://thevacationist-api.herokuapp.com'
};

const env = window.location.hostname === 'localhost' ? 'development' : 'production';

const ApiService = async (method, path, body={}, headers={}) => {

    const reqOptions = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers },
    }

    if (method !== 'GET'){
        reqOptions.body = JSON.stringify(body)
    }
    
    const res = await fetch(`${baseUrls[env]}/${path}`,reqOptions)
    
    return res.json()
};

export default ApiService;

