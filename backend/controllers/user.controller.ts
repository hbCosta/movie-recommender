import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

export class UserController {
    async getProfile(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado." });
            }

            const user = await prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            });
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error("Erro ao buscar perfil", error);
            return res.status(500).json({ error: "Erro ao buscar perfil." });
        }
    }

    async updateProfile(req: AuthRequest, res: Response) {
        try {
            const userId = req.user?.id;
            const { name, email } = req.body;

            if (!userId) {
                return res.status(401).json({ error: "Usuário não autenticado." });
            }

            if (!name && !email) {
                return res.status(400).json({ error: "Nenhum dado para atualizar." });
            }

            const updateUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    email,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            return res.json(updateUser);
        } catch (error) {
            console.error("Erro ao atualizar perfil", error);
            return res.status(500).json({ error: "Erro ao atualizar perfil." });
        }
    }
}
