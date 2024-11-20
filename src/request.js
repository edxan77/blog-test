import axios from "axios";
import $auth from "@/auth";
import router from "@/router";

let $request = {};

$request.post = function (action, data,  isAuthorizationNeeded, callBack) {
    axios.post(action, data, isAuthorizationNeeded ? {headers: {Authorization: `Bearer ${$auth.getToken()}`, "Content-Encoding": "multipart/form-data"}} : {})
        .then(response => {
            console.log(data);
            callBack(response);
        })
        .catch(error => {
            if (isAuthorizationNeeded && error.response.status === 401) {
                $auth.logout();
                router.push('/login');
            }
        });
}

$request.get = function (action, callBack, data = {}) {
    axios.get(action, data)
        .then(response => {
            callBack(response)
        })
        .catch(error => {
            console.error(error)
        });
}

export default $request;