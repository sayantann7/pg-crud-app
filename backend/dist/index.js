"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client = new pg_1.Client("postgresql://neondb_owner:npg_hQlbyR9rATE8@ep-spring-voice-a4fjq1vc-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
const saltRounds = 10;
const startClient = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected to PostgreSQL database");
    }
    catch (error) {
        console.error("Error connecting to PostgreSQL database", error);
    }
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query("SELECT * FROM users");
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching users", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        yield client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);
        res.status(201).send("User added");
    }
    catch (error) {
        console.error("Error creating user", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield client.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password, user.password)) {
                res.status(200).send("Login successful");
            }
            else {
                res.status(401).send("Invalid credentials");
            }
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.error("Error logging in", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield client.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).send("User not found");
        }
    }
    catch (error) {
        console.error("Error fetching user", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.put("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const hashedPassword = bcrypt_1.default.hashSync(password, saltRounds);
        yield client.query("UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4", [username, email, hashedPassword, id]);
        res.status(200).send("User updated");
    }
    catch (error) {
        console.error("Error updating user", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.delete("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client.query("DELETE FROM users WHERE id = $1", [id]);
        res.status(200).send("User deleted");
    }
    catch (error) {
        console.error("Error deleting user", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.get("/tweets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query("SELECT * FROM tweets ORDER BY created_at DESC");
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching tweets", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/tweets/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const userId = req.params.userId;
    try {
        yield client.query("INSERT INTO tweets (user_id, content) VALUES ($1, $2)", [userId, content]);
        res.status(201).send("Tweet added");
    }
    catch (error) {
        console.error("Error creating tweet", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.delete("/tweets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client.query("DELETE FROM tweets WHERE id = $1", [id]);
        res.status(200).send("Tweet deleted");
    }
    catch (error) {
        console.error("Error deleting tweet", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.get("/tweets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield client.query("SELECT * FROM tweets WHERE id = $1", [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).send("Tweet not found");
        }
    }
    catch (error) {
        console.error("Error fetching tweet", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.get("/tweets/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield client.query("SELECT * FROM tweets WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
        res.json(result.rows);
    }
    catch (error) {
        console.error("Error fetching user's tweets", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.listen(PORT, () => {
    startClient();
    console.log(`Server is running on http://localhost:${PORT}`);
});
