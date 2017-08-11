
const api = process.env.OSTHUS_API_URL || 'http://localhost:5353/v1/first'

var token = localStorage.token
window.osthus = {}

window.osthus.assemble = function(params) {
    var parts = [];

    for (var key in params) {
        var value = params[key];

        if (typeof value === 'object' && value !== null) {
            value = JSON.stringify(value);
        }

        parts.push(key + '=' + value);
    }

    return parts.join('&');
}

window.osthus.replace = function(url, params) {
    return url.replace(/\{([a-zA-Z0-9_\-]+)\}/g, function(match, key) {
        if (typeof params[key] === 'undefined') {
            params[key] = null;
            //throw 'Parameter "' + key + '" not found';
        }

        var value = params[key];

        if (typeof value === 'object' && value !== null) {
            value = JSON.stringify(value);
        }

        delete params[key];
        return value;
    });
}

window.osthus.url = function(route, params) {
    var url = api + route;
    var token = token ? token : '';

    if (typeof params === 'string') {
        return url + token + '&' + params;
    }

    if (typeof params === 'object') {
        params = Object.assign({
            token: token
        }, params);

        return window.osthus.replace(url, params) + '?' + window.osthus.assemble(params);
    }

    return url + token;
}