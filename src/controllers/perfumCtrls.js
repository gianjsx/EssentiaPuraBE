import Perfum from "../model/perfumMdl.js";
import { deleteFile, uploadImage } from "./utils/utils.js";

export const getPerfums = async (req, res) => {
  try {
    let perfumDB = await Perfum.find({
      isActive: true,
    });
    if (!perfumDB) {
      return res.status(500).json({
        ok: false,
        message: "Error trying to ger perfums",
      });
    }
    return res.status(200).json({
      ok: true,
      perfums: perfumDB,
    });
  } catch (error) {
    console.log("Error trtyin to ger info from db", error);
    return res.status(500).json({
      ok: false,
      message: "Error with the DB server",
    });
  }
};

export const postPerfum = async (req, res) => {
  // console.log("hello");
  let image = req.file.path;

  let {
    name,
    description,
    price,
    quantity,
    topNotes,
    middleNotes,
    baseNotes,
    brand,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !quantity ||
    !topNotes ||
    !middleNotes ||
    !baseNotes ||
    !brand
  ) {
    await deleteFile(image);
    return res.status(400).json({
      ok: false,
      message: "All field are required",
    });
  }
  // return res.status(200).json({ message: "Recived" });
  if (!req.file) {
    return res.status(400).json({
      ok: false,
      message: "Image required",
    });
  }
  try {
    const imageUploaded = await uploadImage(image);
    deleteFile();
    if (imageUploaded.ok) {
      const perfum = new Perfum();
      perfum.name = name;
      perfum.description = description;
      perfum.price = price;
      perfum.imageURL = imageUploaded.imageupload.url;
      perfum.quantity = quantity;
      perfum.topNotes = topNotes;
      perfum.middleNotes = middleNotes;
      perfum.baseNotes = baseNotes;
      perfum.brand = brand;
      const perfumDB = await perfum.save();
      if (!perfumDB) {
        await deleteFile(image);
        return res.status(500).json({
          ok: false,
          message: "Error saving db",
        });
      }
      await deleteFile(image);
      return res.status(200).json({
        ok: true,
        message: "Perfum saved",
      });
    }
    await deleteFile(image);
    return res.status(500).json({
      ok: false,
      message: "Error upload image",
    });
  } catch (error) {
    console.log("error trying to upload file", error);
    await deleteFile(image);
    return res.status(400).json({
      ok: false,
      message: "error in database",
    });
  }
};
