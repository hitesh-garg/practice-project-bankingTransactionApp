const express = require('express')
const mongoose = require('mongoose');

const { authMiddleware } = require('../middlewares');
const { Account } = require('../db');
const router = express.Router();

router.get("/balance" , authMiddleware , async (req , res) => {
    const account = await Account.findOne({
        userId: req.userid
    });

    if(!account){
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        balance: account.balance
    })
});

router.post("/transfer" , authMiddleware , async(req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to } = req.body;

    const account = await Account.findOne({userId: req.userid}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId: req.userid} , { $inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to} , {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });

});

module.exports = router;