import { Router } from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product'
import { handleInputErrors } from './modules/middleware'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'
import { createNewUpdatePoint, deleteUpdatePoint, getAllUpdatePoint, getOneUpdatePoint, updateUpdatePoint } from './handlers/updatepoint'
const router = Router()

router.get('/product', getProducts)
router.get('/product/:id',getOneProduct)
router.put('/product/:id', [body("name").isString(), handleInputErrors], updateProduct)
router.post('/product', createProduct)
router.delete('/product/:id', deleteProduct)
/*
 update 
*/
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id',
    body("title").optional(),
    body('body').optional(),
    oneOf([
      body('status').equals('IN_PROGRESS'),
      body('status').equals('SHIPPED'),
      body('status').equals('DEPRECATED')
    ]),
    body('version').optional(),
    updateUpdate)
router.post('/update',
    body("title").exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    createUpdate)
router.delete('/update/:id', deleteUpdate)
/*
updatepoint
*/
router.get('/updatepoint', getAllUpdatePoint)

router.get('/updatepoint/:id', getOneUpdatePoint)

router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    updateUpdatePoint)

router.post('/updatepoint', createNewUpdatePoint)

router.delete('/updatepoint/:id', deleteUpdatePoint)

export default router
