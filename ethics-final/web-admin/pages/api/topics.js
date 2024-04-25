import { mongooseConnect } from "@/lib/mongoose";
import { Topic } from "@/models/Topic";
import mongoose from "mongoose";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();

    if (method === "GET") {
        if (req.query?.id) {
            res.json(await Topic.findOne({_id:req.query.id}));
        } else {
            res.json(await Topic.find());
        }
    }

    if (method === "POST") {
        const {name, description} = req.body;
        const topicDoc = await Topic.create({
            name, description
        });
        res.json(topicDoc);
    }

    if (method === 'PUT') {
        const {name, description,_id} = req.body;
        await Topic.updateOne({_id}, {name,description});
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Topic.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}
  