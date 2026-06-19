import { model, Schema, models } from 'mongoose';

const FeedbackSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  name: { type: String },
  comment: { type: String, required: true },
}, { timestamps: true });

const Feedback = models.Feedback || model('Feedback', FeedbackSchema);

export default Feedback;
