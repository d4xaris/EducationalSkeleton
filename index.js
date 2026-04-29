const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/tasks", require("./src/routes/tasks"));

app.get("/", (req, res) =>
  res.json({ message: "Task Manager API", version: "1.0.0" }),
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

module.exports = app;
