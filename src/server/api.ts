import Router from "koa-router"

import { Item } from "../shared/models"

const items: Item[] = [
  { id: "1", title: "item 1" },
  { id: "2", title: "item 2" },
]

const api = {
  getItems(ctx: Router.IRouterContext) {
    ctx.body = items
  },

  getItem(ctx: Router.IRouterContext) {
    const { id } = ctx.params

    if (!id || typeof id !== "string") {
      ctx.status = 400
      return
    }

    const item = items.find(i => i.id === id)

    if (!item) {
      ctx.status = 404
      return
    }

    ctx.body = item
  },
}

export default api
