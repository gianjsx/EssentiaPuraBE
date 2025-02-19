import fs from "fs-extra";
import cloudinary from "cloudinary";
import config from "../../config.js";

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

export const deleteFile = async (file) => {
  if (fs.existsSync(file)) {
    await fs.unlink(file);
    return console.log("File deleted");
  } else {
    return console.log("File Does not Exist");
  }
};

export const uploadImage = async (image) => {
  try {
    let imageupload = await cloudinary.v2.uploader.upload(image);
    console.log("subido");
    return {
      ok: true,
      message: "Image uploaded",
      imageupload,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error upload image",
    };
  }
};
