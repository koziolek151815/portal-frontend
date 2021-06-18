import jwt from "jwt-decode";


export var onChangeLogin = new Set();

function notify()
{
    const status =  isLoggedIn();
    onChangeLogin.forEach(t=>t(status));
}

export const addOnChangeLoginListener = (listener)=>{
    onChangeLogin.add(listener);
}

export const removeOnChangeLoginListener = (listener)=>{
    onChangeLogin.delete(listener);
}

export const isLoggedIn = ()=>{
    return localStorage.getItem('token') !== null;
}

export const login = (token)=>{
    localStorage.setItem("token", token);
    // console.log(localStorage.getItem("token"));
    const decoded = jwt(localStorage.getItem('token'));
    // localStorage.setItem("roles", decoded['roles']);
    // console.log(localStorage.getItem('roles'));
    notify();
}

export const logout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    window.location="/home";
    notify();
}