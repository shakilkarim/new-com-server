const { readdirSync } = require('fs');
// const path = require('path');
const express = require('express');

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const morgan = require('morgan');

const cors = require('cors');
mongoose.set("strictQuery", false);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// routes middleware
readdirSync('./routes').map((r) => app.use("/api/v1",require(`./routes/${r}`)));

// Server
const port = process.env.PORT || 8000;

// Connect to DB and start server
mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Runing port ${port}`);
        });
    })
    .catch((err) => console.log(err));
