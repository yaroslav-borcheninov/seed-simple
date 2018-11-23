import Koa from "koa"
import serve from "koa-static"
import mount from "koa-mount"
import path from "path"

const app = new Koa()
app.use(serve(path.resolve(__dirname, "../../build")))
const assets = mount("/assets", app)

export default assets
