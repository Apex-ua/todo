const user = 'user_2';
const pass = 'epTjZzcYEJD3V1cQ';
const database = 'cats';
const link = `mongodb+srv://${user}:${pass}@node-test-vm17x.mongodb.net/${database}?retryWrites=true&w=majority`;

const secrets = {
    dbUri: `mongodb+srv://user_2:epTjZzcYEJD3V1cQ@node-test-vm17x.mongodb.net/cats?retryWrites=true&w=majority`,
};

const getSecret = (key) => secrets[key];

module.exports = { getSecret };