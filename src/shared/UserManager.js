import Keycloak from 'keycloak-js';

const userManagerConfig = {
    url: 'https://accounts.kab.info/auth',
    realm: 'main',
    clientId: 'wf-upload-ui'
};

const initOptions = {
    onLoad: "check-sso",
    checkLoginIframe: false,
    flow: "standard",
    pkceMethod: "S256",
    enableLogging: true
};

export const kc = new Keycloak(userManagerConfig);

kc.onTokenExpired = () => {
    renewToken(0);
};

kc.onAuthLogout = () => {
    console.log("-- LogOut --");
    kc.logout();
}

const renewToken = (retry) => {
    kc.updateToken(5)
        .then(refreshed => {
            if(refreshed) {
                setData();
            } else {
                console.warn('Token is still valid?..');
            }
        })
        .catch(() => {
            retry++;
            if(retry > 50) {
                kc.clearToken();
            } else {
                setTimeout(() => {
                    renewToken(retry);
                }, 10000);
            }
        });
}

const setData = () => {
    const {realm_access: {roles}, sub, given_name, name, email} = kc.tokenParsed;
    const user = {display: name, email, roles, id: sub, username: given_name};
    return user;
}

export const getUser = (callback) => {
    kc.init(initOptions)
        .then(authenticated => {
            const user = authenticated ? setData() : null;
            callback(user);
        }).catch(err => console.error(err));
};

export default kc;
