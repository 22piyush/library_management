import express from "express";
import { config } from "dotenv";



config();

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));