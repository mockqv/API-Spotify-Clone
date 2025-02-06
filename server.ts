import * as dotenv from "dotenv";
import express from "express";
import authRoutes from "./src/routes/authRoute";
import artistsRoutes from "./src/routes/artistsRoutes"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
authRoutes(app);
artistsRoutes(app);

app.listen(PORT, () => {
  console.log(`Server escutando na porta ${PORT}`);
});
