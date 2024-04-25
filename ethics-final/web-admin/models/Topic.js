const { Schema, model, models } = require("mongoose");

// fix to require these
const TopicSchema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true}
});

export const Topic = models.Topic || model('Topic', TopicSchema);