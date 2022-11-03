const axios = require("axios")

const getPoets = async () => {
    try {
        const url = "https://poetrydb.org/author";
        const poets = await axios.get(url);

        return poets.data.authors;
    } catch (error) {
        console.log(error)
    }
}

const getPoetryByPoets = async (req, res, next) => {
    try {

        const poets = await getPoets();
        console.log("poets is available");
        console.log(poets)
        var poetries = [];
        await Promise.all(await poets.map(async (poet) => {
            const url = "https://poetrydb.org/author";
            const poetryByPoets = await axios.get(url + `/${[poet]}`);
            poetries.push({
                poets: poet,
                poetries: JSON.stringify(poetryByPoets.data),
            })
        }))
        res.status(200).send(poetries)
    } catch (error) {
        console.log(error)
        res.status(error.status).send("Error");
    }
}



await getPoets()
module.exports = { getPoetryByPoets }