import { body } from "express-validator"
import { prisma } from "../db"

export const getOneUpdate = async (req, res) => { 
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id
        }
    })
    res.status(200)
    res.json({data: update})
 }

export const getUpdates = async (req, res) => { 
    const updates = await prisma.update.findMany()
    res.status(200)
    res.json({data: updates})
}

export const createUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: { 
            id: req.body.productId
         }
    })
    const newUpdate = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: product}
        }
    })
    res.json({data: newUpdate})
}

export const updateUpdate = async (req, res) => { 
    const updateUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.json({data: updateUpdate})
}

export const deleteUpdate = async (req, res) => { 
    const delUpdate = prisma.update.delete({ where: { id: req.params.id } })
    res.json({data: delUpdate})
 }
