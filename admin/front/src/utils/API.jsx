import axios from 'axios';
axios.defaults.withCredentials = true
const url = ""

export default {
    login: async function(email, password) {
        const body = { username: email, password: password };
        try {
            const { data: response, status: statusid } = await axios.post('/user/login', body);
            if (statusid === 200) {
                console.log("logged in", response.firstname, response.lastname)
                localStorage.setItem("firstname", response.firstname);
                localStorage.setItem("lastname", response.lastname);
                localStorage.setItem("email", email);
                localStorage.setItem("userID", response.userID);
                return true
            }
        } catch (err) {
            localStorage.clear();
            return false;
        }
        return false;
    },
    register: async function(email, password, firstname, lastname) {
        try {
            const body = { username: email, password: password, firstname: firstname, lastname: lastname };
            const { data: response, status: statusid } = await axios.post('/user/register', body);
            if (statusid === 200) {
                localStorage.setItem("firstname", firstname);
                localStorage.setItem("lastname", lastname);
                localStorage.setItem("email", email);
                localStorage.setItem("userID", response.userID);
                return true;
            }
            return false;
        } catch (err) {
            localStorage.clear();
            return false;
        }
    },
    updatePassword: async function(password) {
        const body = { password: password};
        const { status: statusid } = await axios.post('/user/password/update', body);
        if (statusid === 200) {
            return true;
        }
        return false;
    },
    isAuth: function() {
        return (localStorage.getItem("token") !== null);
    },
    logout: async function() {
        try {
            console.log('logging out')
            await axios.get('/user/logout');
            console.log('logged out')
        } catch (e) {
            console.log("Error: ", e);
        }
        localStorage.clear();
        window.location = "/";
    },
    isConnected: async function() {
        let res = await axios.get(url + "/user/isauth");
        console.log("res", res)
        if (res.status === 200) {
            return res.data.connected;
        } else {
            return false;
        }
    },
    steamConnect: async function () {
        //return;
        let res = await axios.get(url + "/user/auth/steam");
        if (res.status === 302) {
            window.open("http://localhost:8080/user/auth/steam", "_blank");
        } else {
            return false;
        }
    }
};