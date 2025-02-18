import { Router } from "express";
import { getPerfums, postPerfum } from "../controllers/perfumCtrls.js";
import { getBrands, postBrand } from "../controllers/brandCtrls.js";

const router = Router();

//PERFUMS
router.get("/perfums", getPerfums);
router.post("/perfums", postPerfum);

//BRAND
router.get("/brands", getBrands);
router.post("/brand", postBrand);

export default router;
