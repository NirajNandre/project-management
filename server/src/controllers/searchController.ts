import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const search = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.query;

    // Check if query is defined
    if (!query) {
        res.status(400).json({ message: "Query parameter is missing" });
        return;
    }

    try {
        const tasks = await prisma.task.findMany({
            where: {
                OR: [
                    { title: { contains: query as string, mode: "insensitive" } },
                    { description: { contains: query as string, mode: "insensitive" } },
                ],
            },
        });

        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { name: { contains: query as string, mode: "insensitive" } },
                    { description: { contains: query as string, mode: "insensitive" } },
                ],
            },
        });

        const users = await prisma.user.findMany({
            where: {
                OR: [{ username: { contains: query as string, mode: "insensitive" } }],
            },
        });

        res.json({ tasks, projects, users });
    } catch (error: any) {
        console.error("Search Error: ", error); // Log full error in the backend
        res.status(500).json({ message: `Error performing search: ${error.message}`, error });
    }
};