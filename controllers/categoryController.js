import CategoryModel from "../models/CategoryModel.js"
import slugify from 'slugify'
export const createCategoryController= async (req,res) =>{
  
    try{
      const {name}= req.body
      if(!name){
        return res.status(401).send({message:'name is required'})
      }
      const existingCategory= await CategoryModel.findOne({name})
      if(existingCategory){
        return res.status(200).send({
            success:true,
            message:'category already exisit'
        })
      }
      const category=await new CategoryModel({name,slug:slugify(name)}).save()
      res.status(201).send({
        success:true,
        message:'new category created',
        category
      })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error in category'
        })

    }
}
// 
export const updateCategoryController= async (req,res)=>{
  try{
    const {name}=req.body
    const {id}=req.params

   const category=await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
   res.status(200).send({
    success:true,
    message:'successfully updated',
    category,
   })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'error with update category'
    })
  }
}
// get all category
export const categoryController=async (req,res)=>{
  try {
    const category=await CategoryModel.find({})
    res.status(200).send({
        success:true,
        message:'successfully garbed all categories ',
        category
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'error with get all category'
    })
  }
}
// single category
export const signleCategoryController=async(req,res)=>{
try {
    const {slug}=req.params
    const category=await CategoryModel.findOne({slug})
    res.status(200).send({
        success:true,
        message:'successfully garbed single category ',
        category
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'error with get single category'
    })
}
}
export const deleteCategoyController=async(req,res)=>{
   try {
      const {id}=req.params
      const category= await CategoryModel.findByIdAndDelete(id)
      res.status(200).send({
        success:true,
        message:'successfully deleted category ',
        category
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        error,
        message:'error delete category'
    })
   }
}