import express from 'express';
import dotEnv from 'dotenv';

dotEnv.config()
const app = express();

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(process.env.API_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://${process.env.API_HOST}:${process.env.API_PORT}`);
});
