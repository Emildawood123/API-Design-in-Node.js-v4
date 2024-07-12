import { body } from "express-validator"
import { prisma } from "../db"

export const getOneProduct = async (req, res) => { 
    const product = await prisma.product.findFirst({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })
    res.status(200)
    res.json({data: product})
 }

export const getProducts = async (req, res) => { 
    const products = await prisma.product.findMany()
    res.json({data: products})
 }

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.json({data: product})
    }
    catch (err) {
        next(err)
    }
}
export const deleteProduct = async (req, res) => { 
    const product = await prisma.product.delete({ where: { id: req.params.id,
            belongsToId: req.user.id} })
    res.json({data: product})
 }
export const updateProduct = async (req, res) => { 
    const id = req.params.id
    const product = await prisma.product.update({ where: { id: id }, data: { name: req.body.name, belongsToId: req.user.id } })
    res.status(200)
    res.json({data: product})
 }
