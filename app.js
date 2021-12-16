import express from "express";
const app = express();

import dotenv from 'dotenv';
dotenv.config();


app.use(express.static("public")); // defines that express finds static files in the public-folder
app.use(express.json()); // makes express interprer incoming data as json
app.use(express.urlencoded({extended: true})); // supports data from forms - needed to parse form-data


//------- ROUTES

import contactRouter from "./routers/contact.js";
app.use(contactRouter.router);



// Forbereder siderne
import { createPage } from "./render.js";

const frontpage = createPage("frontpage/frontpage.html", {
    title: "VibeJewelry"
});

const contactPage = createPage("contact/contact.html", {
    title: "Kontakt",
    script: "contact/contact.js",
    styling: "contact/contact.css",
});


// endpoints
app.get("/", (req, res) => {
    res.send(frontpage);
})


app.get("/contact", (req, res) => {
    res.send(contactPage);
})






















const PORT = 8080;
app.listen(PORT, (error) => {
    error ? console.log("Error starting server:", error) : console.log("Starting server on port", PORT);
});