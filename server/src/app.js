const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const alertsRoutes = require('./routes/alerts');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger); // Custom logger

// Routes
app.use('/alerts', alertsRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Flying Panda Visa Alerts API is running');
});

// Error Handling
app.use(errorHandler);

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
