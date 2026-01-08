import mongoose from "mongoose";
import ProductInquiry from "../models/productInquiry.js";
import { productInquiryFormSchema, respondedSchema } from "../validators/productInquiry.schema.js";

//Create Product inquiry form

export const createProductInquiryForm = async (req,res) =>{
    try{
        const parsed = productInquiryFormSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                success: false,
                errors: parsed.error.errors
            })
        }

        const form = new ProductInquiry( parsed.data );

        await form.save();

        res.status(201).json({
            success: true,
            form 
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// GET Product Inquiry form

export const getProductInquiryForm = async (req, res) =>{

    try{
        const forms = await ProductInquiry.find().populate("product").sort({createdAt: -1});

        res.status(200).json({
            success: true,
            forms
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateResponded = async (req, res) => {
  try {
    const parsed = respondedSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        errors: parsed.error.errors
      });
    }

    const { id } = req.params;

    // Optional but recommended ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid form ID"
      });
    }

    const form = await ProductInquiry.findById(id);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Product inquiry form not found"
      });
    }

    form.responded = parsed.data.responded;
    // form.comment = parsed.data.comment;

    if (parsed.data.comment !== undefined) {
    form.comment = parsed.data.comment;
    }

    if (!parsed.data.responded) {
    form.comment = null;
    }
    await form.save();

    return res.status(200).json({
      success: true,
      form
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete OEM form

export const deleteProductInquiryForm = async (req, res) =>{
    try{
        const { id } = req.params;

        // Optional but recommended ObjectId validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid form ID"
        });
        }

        const form = await ProductInquiry.findByIdAndDelete(req.params.id);

        if(!form){
            return res.status(404).json({
                success: false,
                message : "Form not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "form deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



// if you want to improve use this -- provide good validation if product don't exist

// import Product from "../models/product.js";

// const productExists = await Product.exists({ _id: parsed.data.product });
// if (!productExists) {
//   return res.status(400).json({
//     success: false,
//     message: "Invalid product reference"
//   });
// }