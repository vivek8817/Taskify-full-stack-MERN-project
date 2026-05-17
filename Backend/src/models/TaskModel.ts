import mongoose, {Document,Schema} from 'mongoose';

export interface ITask extends Document{
    title: string,
    completed: boolean;
    user: mongoose.Schema.Types.ObjectId;
}

// Schema Creation
const taskSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: [true, 'Please add a text value'] 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    user: {
      // Yeh line is Task ko ek specific User ke ID se jod deti hai 
      type: Schema.Types.ObjectId, 
      required: true, 
      ref: 'User' // Relational link to UserModel
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', taskSchema);
