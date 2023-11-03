const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { Pool } = require("pg");

const app = new Koa();

app.use(cors());

const router = new Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get("/campsites", async (ctx) => {
  const query = `
        SELECT id, name, ST_AsGeoJSON(location) AS location 
        FROM campsites;
    `;
  const { rows } = await pool.query(query);

  const geojsonData = {
    type: "FeatureCollection",
    features: rows.map((row) => ({
      type: "Feature",
      properties: {
        id: row.id,
        name: row.name,
      },
      geometry: JSON.parse(row.location),
    })),
  };

  ctx.body = geojsonData;
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
