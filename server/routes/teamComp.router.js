const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated, rejectAdmin} = require('../modules/authentication-middleware');

// add new team compositions to the db for that user
router.post('/', rejectUnauthenticated, (req, res) => {
    let hero = req.body;
    let queryText = `INSERT INTO "team_compositions" ("user_id", "name", "tank_one", "tank_two", "dps_one", "dps_two", "support_one", "support_two")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryText, [req.user.id, hero.name, hero.tank_one_id, hero.tank_two_id, hero.dps_one_id, hero.dps_two_id, hero.support_one_id, hero.support_two_id])
    .then(result => {
        res.sendStatus(201);
    }).catch(error => {
        res.sendStatus(500)
    })
});

//get user's saved team compositions
router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT "team_compositions".id, "team_compositions".name, json_agg(json_build_object('heroId', "heroes".id, 'hero', "heroes".name, 'role', "heroes".role, 'image', "heroes".image)) AS "heroList"
    FROM "team_compositions"
    JOIN "heroes" ON "heroes".id = "team_compositions".tank_one OR "heroes".id = "team_compositions".tank_two OR "heroes".id = "team_compositions".dps_one 
    OR "heroes".id = "team_compositions".dps_two OR "heroes".id = "team_compositions".support_one OR "heroes".id = "team_compositions".support_two
    WHERE "team_compositions".user_id = $1
    GROUP BY "team_compositions".id;`;
    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500);
    })
})


module.exports = router;