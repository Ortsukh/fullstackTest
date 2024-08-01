import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
interface AuthRequest extends Request {
    user?: IUser | null; // Измените свойство user на IUser | null
}
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log(req)
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'secret-key') as { id: string };

            // Используем try/catch блок для обработки возможных ошибок
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            req.user = user; // Теперь это гарантированно IUser
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};