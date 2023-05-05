const path = require("path");
const nconf = require("nconf");
const dotenv = require("dotenv");
const axios = require("axios").default;

const configPath = path.join(__dirname, "globalconfig.json");

dotenv.config();
nconf.argv().env().file({ file: configPath });

const octoprintApiEndpoint = `${nconf.get("octoprint:host")}:${nconf.get("octoprint:port")}`;

/* Inserts the authentication into the request */
function octoprintRequest(axiosConfig) {
    if (!axiosConfig.headers.Authorization) {
        if (!axiosConfig.headers) axiosConfig.headers = {};

        axiosConfig.headers.Authorization = "Bearer " + nconf.get("APIKEY");
    }

    return axios(axiosConfig);
}

// TODO test if this works :/
async function getProgress() {

    const response = await octoprintRequest({
        method: "get",
        url: "/api/job",
        host: octoprintApiEndpoint,
    });

    const data = JSON.parse(response.data);

    console.log(data);

}