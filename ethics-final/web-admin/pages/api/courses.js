import { mongooseConnect } from "@/lib/mongoose";
import { Course } from "@/models/Course";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Course.findOne({_id:req.query.id}));
        } else {
            res.json(await Course.find());
        }
    }

    if (method === "POST") {
        const {title,description,images,topic} = req.body;
        const courseDoc = await Course.create({
            title,description,images,topic
        });
        res.json(courseDoc);
    }

    if (method === 'PUT') {
        const {title,description,images,topic,_id} = req.body;
        await Course.updateOne({_id}, {title,description,images,topic});
        res.json(true);
    }

    if (method === 'DELETE') {
        const {title,description,images,topic,_id} = req.body;
        if (req.query?.id) {
            await Course.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}
  