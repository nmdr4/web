let logs = [];

export default async function handler(req, res) {
    const SECRET = process.env.LOG_SECRET || "miTokenSuperSecreto";
    const token = req.headers["authorization"];
    if (token !== `Bearer ${SECRET}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(200).json(logs);
}