export default async function handler(req, res) {
  const query = req.query.q;
  const apiKey = process.env.YT_API_KEY;

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&q=${encodeURIComponent(query)}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
