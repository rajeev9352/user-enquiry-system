let express = require('express');
let mongoose = require('mongoose');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();
let cors = require('cors');
let app = express();

// Configure CORS to allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use('/api/website/enquiries', enquiryRouter)


// Connect to MongoDB
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});