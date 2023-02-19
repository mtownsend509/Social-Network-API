const router = require('express').Router();

const {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
} = require('../../controllers/userControl.js');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;