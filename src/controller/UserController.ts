import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    res.json(user);
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      return res.status(400).json({ error: 'Senha inválida.' });
    }

    res.json({ message: 'Login feito com sucesso.' });
  }
}