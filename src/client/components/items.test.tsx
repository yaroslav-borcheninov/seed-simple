import React from "react"
import { LinkProps } from "react-router-dom"
import { render, RenderResult } from "@testing-library/react"

import Items from "./items"

jest.mock("react-router-dom", () => ({
  Link: ({ to, children }: LinkProps) =>
    `[Link to="${to}" children="${children}"]`,
}))

describe("Items", () => {
  let RealFetch: GlobalFetch["fetch"]
  let MockFetch: jest.Mock
  let renderResult: RenderResult

  beforeEach(() => {
    RealFetch = window.fetch
    MockFetch = jest.fn().mockReturnValue({
      ok: true,
      json: () => [
        {
          id: "123",
          title: "item 123",
        },
        {
          id: "321",
          title: "item 321",
        },
      ],
    })
    window.fetch = MockFetch

    renderResult = render(<Items />)
  })

  afterEach(() => {
    window.fetch = RealFetch
  })

  it("should call fetch", () => {
    expect(MockFetch).toHaveBeenCalledWith("/api/items")
  })

  it("should render data", () => {
    expect(renderResult.container).toMatchSnapshot()
  })
})
