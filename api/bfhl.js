export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ message: "BFHL GET is working!" });
  } else if (req.method === "POST") {
    res.status(200).json({ message: "BFHL POST is working!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
