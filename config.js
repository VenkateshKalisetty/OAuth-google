let appConfig = {
    "port": 3000,
    "cookie": {
        "name": "VenkyOAuth",
        "key": ["qwertyuiop12345asdfghjkl09876zmxncbv"]
    },
    "google-oauth2": {
        "clientId": "254291923460-0jdiplh9cgt1it16bbubee9qcmg2b1vm.apps.googleusercontent.com",
        "clientSecret": "4SKmrYMZb27Hj8h8fX0GGLzy",
        "callbackUrl": '/auth/google/callback'
    }
}
module.exports = appConfig;