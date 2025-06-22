import { Router } from "express";
import {
  getPerfums,
  postPerfum,
  deletePerfum,
  updatePerfum,
} from "../controllers/perfumCtrls.js";
import { getBrands, postBrand } from "../controllers/brandCtrls.js";

const router = Router();

//PERFUMS
router.get("/perfums", getPerfums);
router.post("/perfums", postPerfum);
router.put("/perfums/:id", deletePerfum);
router.put("/perfumsupdate/:id", updatePerfum);

//BRAND
router.get("/brands", getBrands);
router.post("/brand", postBrand);

export default router;
