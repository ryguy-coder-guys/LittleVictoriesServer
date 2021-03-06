"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routers/tasks"));
const lists_1 = __importDefault(require("./routers/lists"));
const auth_1 = __importDefault(require("./routers/auth"));
const journalEntry_1 = __importDefault(require("./routers/journalEntry"));
const stats_1 = __importDefault(require("./routers/stats"));
const habits_1 = __importDefault(require("./routers/habits"));
const likes_1 = __importDefault(require("./routers/likes"));
const comments_1 = __importDefault(require("./routers/comments"));
const readableFont_1 = __importDefault(require("./routers/readableFont"));
const friends_1 = __importDefault(require("./routers/friends"));
const achievements_1 = __importDefault(require("./routers/achievements"));
const app = express_1.default();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use('/api/tasks', tasks_1.default);
app.use('/api/lists', lists_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/journalEntries', journalEntry_1.default);
app.use('/api/stats', stats_1.default);
app.use('/api/habits', habits_1.default);
app.use('/api/likes', likes_1.default);
app.use('/api/comments', comments_1.default);
app.use('/api/font', readableFont_1.default);
app.use('/api/friends', friends_1.default);
app.use('/api/achievements', achievements_1.default);
app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
});
exports.default = app;
//# sourceMappingURL=app.js.map