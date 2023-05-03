import "./database";
import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";

const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use(routes);

server.listen(PORT, () => console.log("Server listening on port 3000"));
