import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateProductRequest extends Request {
  body: {
    name: string;
    description?: string;
    image?: Buffer;
    price: number;
    quantity: number;
    userId: number;
  }
}

interface UpdateProductRequest extends Request {
  body: {
    name?: string;
    description?: string;
    image?: Buffer;
    price?: number;
    quantity?: number;
    userId?: number;
  }
  params: {
    id: string;
  }
}

interface ProductParams {
  id: string;
}

export default {
  async create(req: CreateProductRequest, res: Response): Promise<Response> {
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
  },

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar lista de produtos.' });
    }
  },

  async getById(req: Request<ProductParams>, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) }
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  async update(req: UpdateProductRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, image, price, quantity, userId } = req.body;

    try {
      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name, 
          description, 
          image, 
          price, 
          quantity, 
          userId
        }
      });

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar produto.' });
    }
  },

  async delete(req: Request<ProductParams>, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      await prisma.product.delete({
        where: { id: Number(id) }
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto.' });
    }
  }
}