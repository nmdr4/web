let logs = [];

export default async function handler(req, res) {
    const SECRET = process.env.LOG_SECRET || "miTokenSuperSecreto";

    if (req.method === "POST") {
        const token = req.headers["authorization"];
        if (token !== `Bearer ${SECRET}`) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const data = req.body;
        if (!data || typeof data !== "object") {
            return res.status(400).json({ error: "Bad request" });
        }

        logs.push(data);
        return res.status(200).json({ ok: true, saved: data });
    }

    return res.status(405).json({ error: "Method not allowed" });
}