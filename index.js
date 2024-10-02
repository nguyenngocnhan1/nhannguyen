const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

// Sử dụng biến môi trường để quản lý kết nối MongoD
const MONGODB_URL='mongodb+srv://vanthien562004:vanthien562004@cluster0.pizki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


// Sử dụng async/await để kết nối MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
};

// Gọi hàm connectDB để kết nối cơ sở dữ liệu
connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

const locationRoute = require('./api/routes/location.route')
app.use("/v1/api/location",locationRoute)

// Kiểm tra nếu process.env.PORT không tồn tại thì sử dụng port 3000 mặc định
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});