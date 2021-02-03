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
                localStorage.setItem("firstname", response.user.firstname);
                localStorage.setItem("lastname", response.user.lastname);
                localStorage.setItem("email", response.user.email);
                localStorage.setItem("userID", response.user._id);
                // {"userID":"5ff583724a2135a2321481a0","firstname":"test","lastname":"test","user":{"_id":"5ff583724a2135a2321481a0","email":"test@test.fr","password":"test","firstname":"test","lastname":"test","date":"2021-01-06T09:31:30.091Z","__v":0,"avatar":"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4c/4c76064be169987500e4c7e228aabe3e33e1df47.jpg","name":"vince52","steamId":"76561198018100252"}}
                if (response.user.avatar)
                    localStorage.setItem("avatar", response.user.avatar);
                if (response.user.name)
                    localStorage.setItem("name", response.user.name);
                if (response.user.steamId)
                    localStorage.setItem("steamId", response.user.steamId);
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
    },
    SteamCallback: async function (openid) {
        try {
            await axios.get("/user/auth/steam/return", {openid})
            console.log('Steam success');
            return true;
        } catch (e) {
            console.log("Error: ", e);
            return false;
        }
    },
    GetAvatar: async function () {
        try {
            let steamids = "76561197960435530";
            let key = "3CCF5D84AD9A4CA0C817B6DEE608348E" ;
            let res = await axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/", {key, steamids});
            console.log('Steam success');
            return res//.response.players[0].avatarmedium;
        } catch (e) {
            console.log("Error: ", e);
            return false;
        }
    },
    createTeam: async function (name, pass) {
        try {
            let body = {name: name, password: pass}
            await axios.post("/team/create", body);
        } catch (e) {
            console.log("Error: ", e);
            return false;
        }
    },
    getTeams: async function() {
        try {
            let res = await axios.get("/team/getAll");
            console.log("GOT TEAMS: ", res);
            return res.data;
        } catch (e) {
            console.log("Error teams: ", e);
            return [];
        }
    },
    getTournaments: async function() {
        try {
            let res = await axios.get("/tournament/getAll");
            console.log("GOT TOURNAMENTS: ", res);
            return res.data;
        } catch (e) {
            console.log("Error teams: ", e);
            return [];
        }
    },
    joinTeam: async function(id) {
        try {
            let body = {teamid: id}
            await axios.post("/team/join", body);
        } catch (e) {
            console.log("Error join teams: ", e);
        }
    },
    leaveTeam: async function(id) {
        try {
            let body = {teamid: id}
            await axios.post("/team/leave", body);
        } catch (e) {
            console.log("Error leave teams: ", e);
        }
    },
    deleteTeam: async function(id) {
        try {
            let body = {teamid: id}
            await axios.post("/team/delete", body);
        } catch (e) {
            console.log("Error delete teams: ", e);
        }
    },
    joinTournament: async function(tournamentid, teamid) { //TODO Meh
        try {
            let body = {tournamentid: tournamentid, teamid: teamid}
            await axios.post("/tournament/join", body);
        } catch (e) {
            console.log("Error join tournament: ", e);
        }
    },
    leaveTournament: async function(tournamentid, teamid) { //TODO Meh
        try {
            let body = {tournamentid: tournamentid, teamid: teamid}
            await axios.post("/tournament/leave", body);
        } catch (e) {
            console.log("Error leave tournament: ", e);
        }
    },
    deleteTournament: async function(tournamentid) { //TODO Meh
        try {
            let body = {tournamentid: tournamentid}
            await axios.post("/tournament/delete", body);
        } catch (e) {
            console.log("Error delete tournament: ", e);
        }
    },
    getTournament: async function(id) {
        try {
            let body = {tournamentid: id}
            let res = await axios.post("/tournament/getTournament", body);
            console.log("one tournament: ", res);
            return res.data
        } catch (e) {
            console.log("error get Tournament: ", e)
        }
    },
    getMatchs: async function(id) {
        try {
            console.log(id._id)
            let res = await axios.get("/match/getMatch/" + id._id);
            console.log("one tournament: ", res);
            return res.data
        } catch (e) {
            console.log("error get Tournament: ", e)
        }
    }
};