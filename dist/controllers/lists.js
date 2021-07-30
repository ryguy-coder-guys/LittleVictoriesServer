"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeList = exports.addList = exports.getLists = void 0;
const list_1 = require("../database/models/list");
exports.getLists = async (req, res) => {
    const lists = await list_1.List.findAll();
    res.send(lists);
};
exports.addList = async (req, res) => {
    const { listName } = req.body;
    const newList = await list_1.List.create({
        name: listName
    });
    res.send(newList);
};
exports.removeList = async (req, res) => {
    const { id } = req.params;
    await list_1.List.destroy({ where: { id } });
    res.send(`list with id of ${id} has been removed from the db.`);
};
//# sourceMappingURL=lists.js.map