import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

interface CreateUserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
  }
}
interface LoginUserRequest extends Request {
  body: {
    email: string;
    password: string;
  }
}

export default {
  async create(req: CreateUserRequest, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        }
      });
  
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar usuário.' });
    }
  },

  async login(req: LoginUserRequest, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if(!isValidPassword) {
        return res.status(400).json({ error: 'Senha inválida.' });
      }
  
      return res.json({ message: 'Login feito com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  }
}