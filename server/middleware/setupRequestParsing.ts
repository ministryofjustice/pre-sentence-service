import express, { Router } from 'express'

const REQUEST_BODY_LIMIT = '200kb'

export default function setUpWebRequestParsing(): Router {
  const router = express.Router()
  router.use(express.json({ limit: REQUEST_BODY_LIMIT }))
  router.use(express.urlencoded({ extended: true, limit: REQUEST_BODY_LIMIT }))
  return router
}
