import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized! Token is missing.',
      });
    }

    const jwtToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

   
    const decoded = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    
    if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden! You do not have permission to access this route.',
      });
    }

  
    req.user = decoded;
    next();
  });
};