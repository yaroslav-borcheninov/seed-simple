import React from "react"
import { render, RenderResult } from "react-testing-library"

import Item from "./item"

describe("Item", () => {
  let RealFetch: GlobalFetch["fetch"]
  let MockFetch: jest.Mock
  let renderResult: RenderResult

  beforeEach(() => {
    RealFetch = window.fetch
    MockFetch = jest.fn().mockReturnValue({
      ok: true,
      json: () => ({
        id: "123",
        title: "item 123",
      }),
    })
    window.fetch = MockFetch

    const props = {
      match: { params: { id: "123" } },
    }
    renderResult = render(<Item {...props as any} />)
  })

  afterEach(() => {
    window.fetch = RealFetch
  })

  it("should call fetch", () => {
    expect(MockFetch).toHaveBeenCalledWith("/api/items/123")
  })

  it("should render data", () => {
    expect(renderResult.container).toMatchSnapshot()
  })
})
