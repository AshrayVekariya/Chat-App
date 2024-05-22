const express = require('express');
const router = express.Router();

const authRouter = require('./authentication');
const userRouter = require('./userRoute');
const messageRouter = require('./messageRoute');

router.use('/authentication', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);

module.exports = router;