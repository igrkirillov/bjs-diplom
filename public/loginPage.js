"use strict";
const uf = new UserForm();

uf.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            uf.setLoginErrorMessage(response.error);
        }
    })
}

uf.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            uf.setRegisterErrorMessage(response.error);
        }
    })
}