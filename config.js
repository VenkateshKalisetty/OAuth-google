let appConfig = {
    "port": 3000,
    "session": {
        "secret": "qwertyuioplkjhgfdsazxcvbnm1234567890"
    },
    "google-oauth2": {
        "clientId": "<ID>",
        "clientSecret": "<SECRETID>",
        "callbackUrl": '/auth/google/callback'
    }
}
module.exports = appConfig;