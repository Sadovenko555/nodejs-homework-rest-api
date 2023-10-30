const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const { User } = require("../../models/user");

const { controllerWrapper, HttpError } = require("../../helpers");

const avatarDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateUserAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);
  const avatarURL = path.join("avatar", filename);

  try {
    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).writeAsync(resultUpload);
  } catch (error) {
    // Обробка помилки при роботі з Jimp
    return next(new HttpError(500, "Failed to process avatar"));
  }

  try {
    await fs.rename(tempUpload, resultUpload);
    const result = await User.findByIdAndUpdate({ _id }, { avatarURL }, { new: true });
    if (!result) {
      throw new HttpError(404, "Not Found");
    }
    res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    // Обробка інших можливих помилок
    return next(new HttpError(500, "Failed to update avatar"));
  }
};

module.exports = {
  updateUserAvatar: controllerWrapper(updateUserAvatar),
};
