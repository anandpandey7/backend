import Marquee from "../models/marquee.js";
import marqueeSchema from "../validators/marquee.schema.js";

export const createMarquee = async (req,res)=>{
    try{
        // two way to perform this
        // 1 if exist say already exist, use put for updating
        // 2 if exist update it
        const parsed = marqueeSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                success: false,
                errors: parsed.error.format()
            })
        }

        const marquee = await Marquee.findOneAndUpdate( {}, parsed.data, {new: true, upsert: true})

        res.status(201).json({
            success: true,
            marquee
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMarquee = async (req,res)=>{
    try{
        const marquee = await Marquee.findOne();
        res.status(200).json({
            success: true,
            marquee
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateMarquee = async (req,res)=>{
    try{
        const parsed = marqueeSchema.safeParse(req.body);

        if(!parsed.success){
            return res.status(400).json({
                success: false,
                errors: parsed.error.format()
            })
        }
        const marquee = await Marquee.findOneAndUpdate({}, parsed.data, {new: true});

        if(!marquee){
            return res.status(404).json({
                success: false,
                message:" Marquee data not found"
            })
        }

        res.status(200).json({
            success: true,
            marquee
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

export const deleteMarquee = async(req, res)=>{
    try{
        const marquee = await Marquee.findOneAndDelete();
        if(!marquee){
            return res.status(404).json({
                success: false,
                message: "There is no marquee data for delete"
            })
        }

        res.status(200).json({
            success: true,
            message : "Marquee data deleted"
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}