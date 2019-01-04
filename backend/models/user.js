import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const User = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String
        
    },
    email: {
        type: String,
        trim: true
    }
});



export default mongoose.model('User', User);