import express from "express";

import { requireSignIn, isAdmin } from "./../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoyController, signleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.put('/update-category/:id', requireSignIn,isAdmin,updateCategoryController)
// get all categories

router.get('/get-category',categoryController)

router.get('/single-category/:slug',signleCategoryController)
// delete
router.delete('/delete-category/:id', requireSignIn,isAdmin,deleteCategoyController)
export default router;
