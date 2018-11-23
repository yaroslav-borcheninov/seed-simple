import Koa from "koa"

import assets from "./assets"
import routes from "./routes"

const app = new Koa()

app.use(assets)
app.use(routes)

app.listen(3000)
