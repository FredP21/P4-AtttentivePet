// Load the express module to create a web application

const express = require("express");

const app = express();

// Configure it

/* ************************************************************************* */

// CORS Handling: Why is the current code commented out and do I need to define specific allowed origins for my project?

// CORS (Cross-Origin Resource Sharing) is a security mechanism in web browsers that blocks requests from a different domain than the server.
// You may find the following magic line in forums:

// app.use(cors());

// You should NOT do that: such code uses the `cors` module to allow all origins, which can pose security issues.
// For this pedagogical template, the CORS code is commented out to show the need for defining specific allowed origins.

// To enable CORS and define allowed origins:
// 1. Install the `cors` module in the backend directory
// 2. Uncomment the line `const cors = require("cors");`
// 3. Uncomment the section `app.use(cors({ origin: [...] }))`
// 4. Be sure to only have URLs in the array with domains from which you want to allow requests.
// For example: ["http://mysite.com", "http://another-domain.com"]

const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, // keep this one, after checking the value in `backend/.env`,
    ],
    credentials: true,
  })
);

/* ************************************************************************* */
const path = require("path");

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

/* ************************************************************************* */

/* ************************************************************************* */

const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use((req, res, next) => {
  if (req.cookies.user_token) {
    // Renouveler le cookie à chaque requête
    res.cookie("user_token", req.cookies.user_token, {
      httpOnly: true,
      path: "/",
      maxAge: 300000, // 5 minutes
    });
  }
  next();
});
/* ************************************************************************* */

// Import the API routes from the router module
const router = require("./router");

// Mount the API routes under the "/api" endpoint
app.use("/api", router);

/* ************************************************************************* */

// Production-ready setup: What is it for, and when should I enable it?

// The code includes commented sections to set up a production environment where the frontend and backend are served from the same server.

// What it's for:
// - Serving frontend static files from the backend, which is useful when building a single-page application with React, Angular, etc.
// - Redirecting unhandled requests (e.g., all requests not matching a defined API route) to the frontend's index.html. This allows the frontend to handle client-side routing.

// When to enable it:
// It depends on your project and its structure. If you are developing a single-page application, you'll enable these sections when you are ready to deploy your project to production.

// To enable production configuration:
// 1. Uncomment the lines related to serving static files and redirecting unhandled requests.
// 2. Ensure that the `reactBuildPath` points to the correct directory where your frontend's build artifacts are located.

/*
const reactBuildPath = `${__dirname}/../../frontend/dist`;

// Serve react resources

app.use(express.static(reactBuildPath));

// Redirect unhandled requests to the react index file

app.get("*", (req, res) => {
  res.sendFile(`${reactBuildPath}/index.html`);
});
*/

module.exports = app;
