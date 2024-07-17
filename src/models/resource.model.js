import mongoose,{Schema} from "mongoose";

const resourceSchema = new Schema({
    title: {
        type: String, 
        required : true
    },
    lesson: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Lesson'
    },
    videolink: {
        type: String, 
        required: true
    },
},{timestamps:true});

export const Resource = mongoose.model('Resource', resourceSchema);