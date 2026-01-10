import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: {
        id: string,
    }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction)=>{
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return res.status(401).json({error: "Token não fornecido"});
        }
        
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({error: "Token mal formatado"});
        }
        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "segredo_padrao_dev"
        ) as {id: string};

        req.user = { id: decoded.id };

        next();
    }catch (error) {
        return res.status(401).json({error: "Token inválido ou expirado"});
    }

}