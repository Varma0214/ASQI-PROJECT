const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const mongo_url=process.env.MONGO_CONN;
mongoose.connect(mongo_url)
    .then(()=>{
        console.log('MongoDB Connected...')
    }).catch((err)=>{
        console.log('MongoDB Connection Error:',err)
    })


app.use('/api/department', departmentRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
