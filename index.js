const express = require("express");
const app = express();

// Passport require users model
require("./routes/api/users");

// Middleware Configurations
require("./config/middlewares")(app);

// Express route handlers
require("./startup/routes")(app);
// MongoDB Connection
require("./startup/db")();

// Deployment Configurations
if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), {
            removeAttributeQuotes: true
        });
    });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

