const { Schema, model, models } = require("mongoose");

// fix to require these
const CourseSchema = new Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    images: [{type:String}],
    topic: {type:String, required: true},
}, {
    timestamps: true,
});

export const Course = models.Course || model('Course', CourseSchema);