import * as express from "express";
import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}
