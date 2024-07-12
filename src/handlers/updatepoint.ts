import { prisma } from "../db"

export const getOneUpdatePoint = async (req, res) => { 
    const getOneUpdPio = prisma.updatePoint.findFirst({
        where: {
            id: req.params.id,
        }
    })
    res.json({data: getOneUpdPio})
}

export const getAllUpdatePoint = async (req, res) => {
    const getAll = prisma.updatePoint.findMany()
    res.json({
        data: getAll
    })
}

export const createNewUpdatePoint = async (req, res, next) => { 
    try {
        const update = await prisma.update.findFirst({
        where: { 
            id: req.body.updateId
         }
        })
        const newUpdate = await prisma.updatePoint.create({
        data: {
            description: req.body.description,
            name: req.body.name,
            update: {connect: update}
        }
    })
    res.json({data: newUpdate})
    } catch {
     next(new Error("update is not exist"))   
    }  
}
 
export const updateUpdatePoint = (req, res, next) => {
    const updateUpdatePoint = prisma.updatePoint.update({
        where: { id: req.params.id }, data: req.body
    })
    res.json({data: updateUpdatePoint})
}

export const deleteUpdatePoint = (req, res, next) => {
    const deleteUpdatePoint = prisma.updatePoint.delete({
        where: { id: req.params.id }
    })
    res.json({data: deleteUpdatePoint})
}
