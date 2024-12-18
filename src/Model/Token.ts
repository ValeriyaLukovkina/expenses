import { Schema, models, model } from 'mongoose';

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export default models?.Token || model('Token', TokenSchema);
