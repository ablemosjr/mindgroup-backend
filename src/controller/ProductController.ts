import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, description, image, price, quantity, userId } = req.body;

    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          image,
          price,
          quantity,
          userId,
        }
      });
      
      return res.status(201).json(product);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar produto.' });
    }
  }
}