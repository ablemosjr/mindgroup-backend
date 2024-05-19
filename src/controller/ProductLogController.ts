import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface Product {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface ProductLog {
  id: number;
  quantity: number;
  type: string;
  createdAt: Date;
  user: User;
  product: Product;
}

export default {
  async getLogs(req: Request, res: Response): Promise<Response> {
    try {
      const logs = await prisma.productLog.findMany({
        include: {
          product: true,
          user: true
        }
      }) as ProductLog[];

      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor'});
    }
  }
}