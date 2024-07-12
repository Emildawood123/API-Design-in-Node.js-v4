import { error } from 'console'
import {prisma} from '../db'
import { comparePasswords, createJWT, hashPassword } from "../modules/auth"

export const createUser = async (req, res, next) => {
  const passHashed = await hashPassword(req.body.password)
    
  try
  {
    const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: passHashed,
    },
    })
    const token = createJWT(user)
    res.json({token})
  } catch (e) {
    e.type = 'input'
   next(e)
 }
    
 }

export const signin = async (req, res, next) => {
  if (req.body.username === "") {
      setTimeout(() => {
        next(new Error('please fill the username'))
      }, 1);
     }
    const user = await prisma.user.findUnique({ where: { username: req.body.username } })
    if (!comparePasswords(req.body.password, user.password)) {
        res.status(401)
        res.json({error: "invalid passowrd"})
    }
    const token = createJWT(user)
    res.json({token})
 }
