const express = require('express');
const router = express.Router();
const multer = require('multer');

const { userValidation } = require('../middlewares/validation');
const { createUser, getAllUser, getUserById, updateUserById, deleteUserById } = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'public/profileImages'); },
    filename: (req, file, cb) => { cb(null, Date.now() + '.jpg'); }
});

const upload = multer({ storage: storage });

router.post('/create', [upload.single('profilePicture'), userValidation], createUser);

router.post('/get/all', getAllUser);

router.get('/get/:id', getUserById);

router.put('/update/:id', upload.single('profilePicture'), updateUserById);

router.delete('/delete/:id', deleteUserById);

module.exports = router;