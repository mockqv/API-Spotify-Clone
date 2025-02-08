import * as dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/authRoutes";
import artistsRoutes from "./src/routes/artistsRoutes"
import songsRoutes from "./src/routes/songsRoutes"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
authRoutes(app);
artistsRoutes(app);
songsRoutes(app);

app.listen(PORT, () => {
  console.log(`Server escutando na porta ${PORT}`);
});
