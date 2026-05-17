import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import {UserModel} from '../models/UserModel';


// Express Request type ko extend kar rahe hain taaki req.user inject kar sakein
export interface AuthRequest extends Request {
  user?: any;
}


export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token extract karo: "Bearer eyJhbG..." -> "eyJhbG..."
      token = req.headers.authorization.split(' ')[1];

      // Token verify karo
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      // User ko database se fetch karo (password chhod kar) aur req mein daal do
      req.user = await UserModel.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};