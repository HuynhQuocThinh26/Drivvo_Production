const pool = require('./pooling');

module.exports = {
    getAllChiPhi: async (req,res) =>{
        const result = await pool.query("select * from chiphi");
        console.log(result)
        res.status(200).send({all: result.rows});
    },
    login: async (req,res) => {
        const result = await pool.query("select * from logindata");
        res.send({results: result.rows});
    }
}