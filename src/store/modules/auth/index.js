/**
 * Auth Module
 */
import Vue from "vue";
import firebase from "firebase/app";
import Nprogress from "nprogress";
import router from "../../../router";
import {} from "../../../firebase";

const state = {
    user: localStorage.getItem("user"),
    isUserSigninWithAuth0: Boolean(localStorage.getItem("isUserSigninWithAuth0")),
};

// getters
const getters = {
    getUser: (state) => {
        return state.user;
    },
    isUserSigninWithAuth0: (state) => {
        return state.isUserSigninWithAuth0;
    },
};

// actions
const actions = {
    signinUserInFirebase(context, payload) {
        const { user } = payload;
        context.commit("loginUser");
        firebase
            .auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((user) => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit("loginUserSuccess", user);
                }, 500);
            })
            .catch((error) => {
                context.commit("loginUserFailure", error);
            });
    },
    logoutUserFromFirebase(context) {
        Nprogress.start();
        firebase
            .auth()
            .signOut()
            .then(() => {
                Nprogress.done();
                setTimeout(() => {
                    context.commit("logoutUser");
                }, 500);
            })
            .catch((error) => {
                context.commit("loginUserFailure", error);
            });
    },
};

// mutations
const mutations = {
    loginUser() {
        Nprogress.start();
    },
    loginUserSuccess(state, user) {
        state.user = user;
        localStorage.setItem("user", user);
        state.isUserSigninWithAuth0 = false;
        router.push("/store/menu");
        setTimeout(function() {
            Vue.notify({
                group: "loggedIn",
                type: "success",
                text: "User Logged In Success!",
            });
        }, 1500);
    },
    loginUserFailure(state, error) {
        Nprogress.done();
        Vue.notify({
            group: "loggedIn",
            type: "error",
            text: error.message,
        });
    },
    logoutUser(state) {
        state.user = null;
        localStorage.removeItem("user");
        router.push("/session/login");
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};