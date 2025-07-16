import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { 
    type: String, 
    enum: ['user', 'ai', 'support'],
    default: 'user' 
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
});

// Exportez explicitement le modèle
const Message = mongoose.model('Message', messageSchema);
export { Message };