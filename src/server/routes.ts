import Router from "koa-router"

import api from "./api"
import html from "./html"

const router = new Router()

router.get("/api/items", api.getItems)
router.get("/api/items/:id", api.getItem)

router.get("/*", ctx => {
  ctx.body = html
})

const routes = router.routes()

export default routes
