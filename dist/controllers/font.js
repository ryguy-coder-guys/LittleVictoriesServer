"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleReadableFontOff = exports.toggleReadableFontOn = void 0;
const user_1 = require("../database/models/user");
const toggleReadableFontOn = async (req, res) => {
    try {
        const { id } = req.params;
        await user_1.User.update({ readable_font: true }, { where: { id } });
        res.status(200).send('readableFont toggled on');
    }
    catch (err) {
        console.log('error updating readableFont to on: ', err);
        res.sendStatus(500);
    }
};
exports.toggleReadableFontOn = toggleReadableFontOn;
const toggleReadableFontOff = async (req, res) => {
    try {
        const { id } = req.params;
        await user_1.User.update({ readable_font: false }, { where: { id } });
        res.status(200).send('readableFont toggled off');
    }
    catch (err) {
        console.log('error updating readableFont to off: ', err);
        res.sendStatus(500);
    }
};
exports.toggleReadableFontOff = toggleReadableFontOff;
//# sourceMappingURL=font.js.map