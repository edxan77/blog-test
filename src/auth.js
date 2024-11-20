function getCookie(name) {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setCookie(name, value, days) {
    let expires = '';
    if (days != 'undefined') {
        let d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
        expires = d.toGMTString();
    }
    document.cookie = name + "=" + value + ";path=/;expires=" + expires;
}

function deleteCookie(name) {
    setCookie(name, '', -1);
}

let $auth = {};

$auth.check = function(){
    let jwt = getCookie('jwt');
    return  jwt != null && jwt != '';
};

$auth.login = function(jwt){
    setCookie('jwt', jwt, 15)
};

$auth.logout = function(){
    deleteCookie('jwt')
};

$auth.getToken = function(){
    return getCookie('jwt');
};

export default $auth
