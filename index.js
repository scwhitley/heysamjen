import express from "express";
import { COMPLIMENTS } from "./compliments.js";

const app = express();

// Health check
app.get("/", (_req, res) => {
  res.type("text/plain; charset=utf-8").send("OK");
});

// Returns ONE random compliment as plain text (single line)
app.get("/compliment", (req, res) => {
  // Optional: seed-based pick for testing: /compliment?i=5
  const iParam = Number.parseInt(req.query.i, 10);
  let text;
  if (!Number.isNaN(iParam) && iParam >= 0 && iParam < COMPLIMENTS.length) {
    text = COMPLIMENTS[iParam];
  } else {
    const idx = Math.floor(Math.random() * COMPLIMENTS.length);
    text = COMPLIMENTS[idx];
  }

  // Make absolutely sure it's a single line and ASCII-safe for SE
  const singleLine = String(text).replace(/\s+/g, " ").trim();

  res.set("Cache-Control", "no-store");
  res.type("text/plain; charset=utf-8").send(singleLine);
});

// JSON variant (handy for debugging outside SE)
app.get("/compliment.json", (_req, res) => {
  const idx = Math.floor(Math.random() * COMPLIMENTS.length);
  res.json({ compliment: COMPLIMENTS[idx], total: COMPLIMENTS.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Compliment API listening on :${PORT}`);
});

