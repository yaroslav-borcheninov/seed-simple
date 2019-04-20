import React from "react"
import { render, RenderResult } from "react-testing-library"

import Loader from "./loader"

jest.useFakeTimers()

describe("Loader", () => {
  const renderComponent = () => render(<Loader />)
  let renderResult: RenderResult

  describe("when mounted", () => {
    beforeEach(() => {
      renderResult = renderComponent()
    })

    it("should render nothing", () => {
      expect(renderResult.container).toMatchSnapshot()
    })

    it("should call setTimeout", () => {
      expect(window.setTimeout).toHaveBeenCalledWith(expect.any(Function), 1000)
    })
  })

  describe("after 999ms", () => {
    beforeEach(() => {
      renderResult = renderComponent()
      jest.advanceTimersByTime(999)
    })

    it("should render nothing", () => {
      expect(renderResult.container).toMatchSnapshot()
    })
  })

  describe("after 1001ms", () => {
    beforeEach(() => {
      renderResult = renderComponent()
      jest.advanceTimersByTime(1001)
    })

    it("should render", () => {
      expect(renderResult.container).toMatchSnapshot()
    })
  })

  describe("when unmounted", () => {
    beforeEach(() => {
      renderResult = renderComponent()
      renderResult.unmount()
    })

    it("should call clearTimeout", () => {
      expect(window.clearTimeout).toHaveBeenCalledWith(expect.any(Number))
    })
  })
})
