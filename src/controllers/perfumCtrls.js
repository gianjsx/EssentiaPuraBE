import Perfum from "../model/perfumMdl.js";
import { deleteFile, uploadImage } from "./utils/utils.js";

export const getPerfums = async (req, res) => {
  try {
    let perfumDB = await Perfum.find({
      isActive: true,
    });
    if (!perfumDB) {
      return res.status(400).json({
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

export const deletePerfum = async (req, res) => {
  const { id } = req.params;
  let updateData = {};
  updateData = updateData.isActive = false;
  try {
    const updatedPerfum = await Perfum.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    if (!updatedPerfum) {
      return res.status(400).json({ ok: false, message: "Perfume not found" });
    }
    console.log(updatedPerfum);
    return res.status(200).json({ ok: true, message: "Perfume Deleted" });
  } catch (error) {
    console.log("e", error);
    return res
      .status(400)
      .json({ ok: false, message: "Error trying to delete the perfum", error });
  }
};

export const postPerfum = async (req, res) => {
  // console.log("hello");
  console.log(req.body);
  console.log(req.file);
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
    priceDecant,
    is100ml,
    isDecant,
  } = req.body;

  if (
    !name ||
    !description ||
    !price ||
    !quantity ||
    !topNotes ||
    !middleNotes ||
    !baseNotes ||
    !brand ||
    !priceDecant
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
      perfum.priceDecant = priceDecant;
      perfum.imageURL = imageUploaded.imageupload.url;
      perfum.quantity = quantity;
      perfum.topNotes = topNotes;
      perfum.middleNotes = middleNotes;
      perfum.baseNotes = baseNotes;
      perfum.brand = brand;
      perfum.is100ml = is100ml;
      perfum.isDecant = isDecant;
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

export const updatePerfum = async (req, res) => {
  let {
    name,
    description,
    price,
    quantity,
    topNotes,
    middleNotes,
    baseNotes,
    brand,
    priceDecant,
    is100ml,
    isDecant,
  } = req.body;
  const { id } = req.params;

  // console.log(req.body);
  // console.log(req.file);
  if (!req.file) {
    // THIS CODE I WHEN THE CLIENT DOES NOT SEND THE IMAGE
    try {
      const updatedPerfum = await Perfum.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            description,
            price,
            priceDecant,
            quantity,
            topNotes,
            middleNotes,
            baseNotes,
            is100ml,
            isDecant,
            brand,
          },
        },
        { new: true }
      );
      if (!updatedPerfum) {
        return res
          .status(404)
          .json({ ok: false, message: "Error trying to update perfum" });
      }
      return res.status(200).json({ ok: true, message: "Perfum Updated " });
    } catch (error) {
      return res
        .status(404)
        .json({ ok: false, message: "Error trying to update perfum" });
    }
    // return res.status(200).json({
    //   ok: true,
    //   message: "File did not send",
    // });
  }

  //THIS CODE IS WHEN THE CLIENT SEND THE IMAGE
  let image = req.file.path;
  try {
    const imageUploaded = await uploadImage(image);
    deleteFile();
    if (!imageUploaded.ok) {
      return res
        .status(400)
        .json({ ok: false, message: imageUploaded.message });
    }
    try {
      const updatedPerfum = await Perfum.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            description,
            price,
            priceDecant,
            quantity,
            topNotes,
            middleNotes,
            baseNotes,
            is100ml,
            isDecant,
            brand,
            imageURL: imageUploaded.imageupload.url,
          },
        },
        { new: true }
      );
      if (!updatedPerfum) {
        await deleteFile(image);
        return res
          .status(404)
          .json({ ok: false, message: "Error trying to update perfum" });
      }
      await deleteFile(image);
      return res.status(200).json({ ok: true, message: "Perfum Updated " });
    } catch (error) {
      await deleteFile(image);
      return res
        .status(404)
        .json({ ok: false, message: "Error trying to update perfum" });
    }
  } catch (error) {
    await deleteFile(image);
    return res
      .status(400)
      .json({ ok: false, message: "Error trying to update the parfum" });
  }
};
