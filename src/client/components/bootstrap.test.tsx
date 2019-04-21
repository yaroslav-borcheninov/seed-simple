import React from "react"
import { render, RenderResult } from "react-testing-library"

import Bootstrap from "./bootstrap"

jest.mock("./loader", () => () => "[Loader]")
jest.mock("./error", () => () => "[Error]")

describe("Bootstrap", () => {
  const props = {
    url: "/test/123",
    children: jest.fn(data => `Test: ${data}`),
  }
  const renderComponent = () => render(<Bootstrap<string> {...props as any} />)

  let RealFetch: GlobalFetch["fetch"]
  let MockFetch: jest.Mock
  let renderResult: RenderResult

  beforeEach(() => {
    RealFetch = window.fetch
    MockFetch = jest.fn()
    window.fetch = MockFetch
  })

  afterEach(() => {
    window.fetch = RealFetch
  })

  describe("when mounted", () => {
    beforeEach(() => {
      // tslint:disable-next-line:no-empty
      const executor = () => {}
      MockFetch.mockReturnValue(new Promise(executor))
      renderResult = renderComponent()
    })

    it("should render Loader", () => {
      expect(renderResult.container).toMatchSnapshot()
    })

    it("should call fetch", () => {
      expect(MockFetch).toHaveBeenCalledWith("/test/123")
    })
  })

  describe("when fetch throws", () => {
    beforeEach(() => {
      MockFetch.mockImplementation(() => {
        throw new Error()
      })
      renderResult = renderComponent()
    })

    it("should render Error", () => {
      expect(renderResult.container).toMatchSnapshot()
    })
  })

  describe("when response is not 2xx", () => {
    beforeEach(() => {
      MockFetch.mockReturnValue(Promise.resolve({ ok: false }))
      renderResult = renderComponent()
    })

    it("should render Error", () => {
      expect(renderResult.container).toMatchSnapshot()
    })
  })

  describe("when response is 2xx", () => {
    beforeEach(() => {
      MockFetch.mockReturnValue(
        Promise.resolve({ ok: true, json: () => "123" })
      )
      renderResult = renderComponent()
    })

    it("should call props.children", () => {
      expect(props.children).toHaveBeenCalledWith("123")
    })

    it("should render props.children", () => {
      expect(renderResult.container).toMatchSnapshot()
    })
  })

  describe("when response is empty", () => {
    beforeEach(() => {
      MockFetch.mockReturnValue(Promise.resolve({ ok: true, json: () => null }))
      renderResult = renderComponent()
    })

    it("should render nothing", () => {
      expect(renderResult.container).toMatchSnapshot()
    })
  })
})
