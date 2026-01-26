require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/auth", require("./routes/auth.routes"));
app.use("/patient", require("./routes/patient.routes"));
app.use("/doctor", require("./routes/doctor.routes"));
app.use("/admin", require("./routes/admin.routes"));

app.listen(process.env.PORT);
