import Brand from "../model/brandMdl.js";
import { deleteFile, uploadImage } from "./utils/utils.js";

export const getBrands = async (req, res) => {
  try {
    const branddb = await Brand.find({
      isActive: true,
    });
    if (!branddb) {
      return res.status(500).json({
        ok: false,
        message: "Error db Brands",
      });
    }
    return res.status(200).json({
      ok: true,
      brand: branddb,
      message: "Succesfull",
    });
  } catch (error) {
    console.log("error eithdb brand", error);
    return res.status(500).json({
      ok: false,
      message: "Error db Brands",
    });
  }
};

export const postBrand = async (req, res) => {
  let image = req.file.path;
  let { name } = req.body;
  if (!name) {
    deleteFile(image);
    return res.status(400).json({
      ok: false,
      message: "Name required",
    });
  }
  if (!req.file) {
    return res.status(400).json({
      ok: false,
      message: "Image required",
    });
  }
  try {
    const imageUploaded = await uploadImage(image);
    let brand = new Brand();
    brand.name = name;
    brand.imageURL = imageUploaded.imageupload.url;
    let branddb = await brand.save();
    if (!branddb) {
      await deleteFile(image);
      return res.status(400).json({
        ok: false,
        message: "Error insertiring brand db",
      });
    }
    await deleteFile(image);
    return res.status(200).json({
      ok: true,
      message: "Success insetered brand",
    });
  } catch (error) {
    await deleteFile(image);
    // console.log("Error trying to inseet bradn db", error);
    return res.status(400).json({
      ok: false,
      message: "Error trying to inseet bradn db",
    });
  }
};
