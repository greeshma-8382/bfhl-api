import express from "express";

const app = express();
app.use(express.json());

// Replace with your details
const FULL_NAME = "john_doe";
const DOB = "17091999"; // ddmmyyyy format
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Helper functions
function isNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function alternatingCapsReverse(str) {
  let rev = str.split("").reverse().join("");
  return rev
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

// POST API
app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];
    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphaConcat = "";

    for (let item of data) {
      if (isNumber(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {
        special_characters.push(item);
      }
    }

    let concat_string = alternatingCapsReverse(alphaConcat);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// Start locally
app.listen(3000, () => console.log("Server running on port 3000"));
