import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    profilePicture: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    profilePicture: { type: String },
});

const UserModel = model<IUser>('UserModel', userSchema);

export default UserModel;