const express = require("express");
const { PythonShell } = require("python-shell");
const path = require("path"); // ✅ Import path module
const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    const { city, area, size_sq_ft, size_yard } = req.body;

    // Define options for Python script
    let options = {
      mode: "text",
      pythonPath: "python", // Change this if Python isn't globally installed
      scriptPath: path.join(__dirname, "../real-state_data_modal/"), // ✅ Correct folder path
      args: [JSON.stringify({ city, area, size_sq_ft, size_yard })],
    };

    // Run the Python script
    PythonShell.run("predict.py", options, function (err, results) {
      if (err) {
        console.error("Prediction error:", err);
        return res.status(500).json({ error: "Error making prediction" });
      }

      try {
        const prediction = JSON.parse(results[0]); // ✅ Ensure valid JSON response
        res.json(prediction);
      } catch (parseError) {
        console.error("Parsing error:", parseError);
        res.status(500).json({ error: "Invalid response from prediction model" });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
