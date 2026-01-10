import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
    async register(req: Request, res: Response){
        try{
            const { name, email, password } = req.body;
            if(!name || !email || !password){
                return res.status(400).json({error: "Preencha todos os campos!"})
            }
            const userExist = await prisma.user.findUnique({
                where:{email},
            });
            if(userExist){
                return res.status(400).json({error: "Email já existe no banco de dados"})
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                },
            });
            
            return res.status(201).json({
                message: "Usuario criado com sucesso!",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            });

        } catch (error) {
            return res.status(400).json({error: "Erro ao registrar usuario!"})
        }
    }

    async login(req: Request, res: Response){
        try{
            const { email, password }  =req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email,
                }
            });
            if (!user){
                return res.status(400).json({error:"Email ou senha invalidos"})
            }
            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword){
                return res.status(400).json({error: "Senha invalida"})
            }

            const token = jwt.sign(
                {id: user.id},
                process.env.JWT_SECRET || "segredo_padrao_dev",
                { expiresIn: "1d"}
            );
            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,

                }
            })

        } catch (error){
            return res.status(500).json({error: "Erro ao fazer login"});
        }
    }
}