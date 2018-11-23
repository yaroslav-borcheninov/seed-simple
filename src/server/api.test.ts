import api from "./api"

describe("api", () => {
  describe("getItems", () => {
    it("should return items", () => {
      const ctx = {
        body: null,
        status: null,
      }
      api.getItems(ctx as any)

      expect(ctx.status).toEqual(null)
      expect(ctx.body).toEqual([
        { id: "1", title: "item 1" },
        { id: "2", title: "item 2" },
      ])
    })
  })

  describe("getItem", () => {
    describe("when id is not set", () => {
      it("should return 400", () => {
        const ctx = {
          params: {},
          body: null,
          status: null,
        }
        api.getItem(ctx as any)

        expect(ctx.status).toEqual(400)
        expect(ctx.body).toEqual(null)
      })
    })

    describe("when id is not a string", () => {
      it("should return 400", () => {
        const ctx = {
          params: { id: Symbol("2") },
          body: null,
          status: null,
        }
        api.getItem(ctx as any)

        expect(ctx.status).toEqual(400)
        expect(ctx.body).toEqual(null)
      })
    })

    describe("when item doesn't exist", () => {
      it("should return 404", () => {
        const ctx = {
          params: { id: "3" },
          body: null,
          status: null,
        }
        api.getItem(ctx as any)

        expect(ctx.status).toEqual(404)
        expect(ctx.body).toEqual(null)
      })
    })

    describe("when all checks passed", () => {
      it("should return item", () => {
        const ctx = {
          params: { id: "2" },
          body: null,
          status: null,
        }
        api.getItem(ctx as any)

        expect(ctx.status).toEqual(null)
        expect(ctx.body).toEqual({ id: "2", title: "item 2" })
      })
    })
  })
})
