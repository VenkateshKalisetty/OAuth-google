let appConfig = {
    "port": 3000,
    "session": {
        "secret": "qwertyuioplkjhgfdsazxcvbnm1234567890"
    },
    "google-oauth2": {
        "clientId": "<ID>",
        "clientSecret": "<SECRET>",
        "callbackUrl": '/auth/google/callback'
    }
}
module.exports = appConfig;