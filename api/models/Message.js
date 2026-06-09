import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: String, enum: ['user', 'agent'], required: true },
  text: { type: String, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
