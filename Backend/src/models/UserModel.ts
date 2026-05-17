import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  // now adding password hash
  matchPassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);


// 2. Pre-Save Middleware: Password hashing ke liye (Bina function arrow use kiye taki 'this' context mile)
UserSchema.pre<IUser>('save', async function () {
    // Agar password modify nahi hua hai toh aage badho
    if (!this.isModified('password')) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error: any) {
        throw error;
    }
});

// 3. Custom Method: Entered password ko hashed password se match karne ke liye
UserSchema.methods.matchPassword = async function (passwordEntered: string): Promise<boolean> {
    return await bcrypt.compare(passwordEntered, this.password);
};

export const UserModel = mongoose.model<IUser>("User", UserSchema);
