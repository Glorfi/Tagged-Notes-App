const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getUser,
  getCurrentUser,
  deleteCurrentUser,
  updateUserInfo
} = require('../controllers/users');
const { updateUserInfoConfig, idConfig, updateAvatarConfig } = require('../utils/validationConfig');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me',  updateUserInfo); // celebrate(updateUserInfoConfig),
// router.patch('/me/avatar', celebrate(updateAvatarConfig), updateUserAvatar);
router.delete('/me', deleteCurrentUser)
router.get('/:id', celebrate(idConfig), getUser);

module.exports = router;
