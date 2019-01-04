
import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Issue = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    responsible: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    severity: {
        type: String,
        trim: true 
    },
    status: {
        type: String,
        default: 'Open',
        trim: true
    }
});



export default mongoose.model('Issue', Issue);