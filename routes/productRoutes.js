import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import {
  createProductController,
  updateProductController,
  getProductController,
  productPhotoController,
  deleteProductController,
  getSingleProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);
// get product count
router.get("/product-count", productCountController);

// filter product
router.post("/product-filters", productFilterController);
// single page content
router.get("/product-list/:page", productListController);
//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);
// search
router.get('/search/:keyword',searchProductController)
// similar product
router.get("/related-product/:pid/:cid",relatedProductController)
// category wise

router.get("/product-category/:slug", productCategoryController);
// token
router.get('/braintree/token',braintreeTokenController)
// PAYMENT 
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)
export default router;
