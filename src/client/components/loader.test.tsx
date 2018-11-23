import React from "react"
import { shallow, ShallowWrapper } from "enzyme"

import Loader from "./loader"

jest.useFakeTimers()

describe("Loader", () => {
  const getComponent = () => shallow<Loader>(<Loader />)
  let component: ShallowWrapper<{}, {}, Loader>

  describe("when mounted", () => {
    beforeEach(() => {
      component = getComponent()
    })

    it("should render nothing", () => {
      expect(component).toMatchSnapshot()
    })

    it("should call setTimeout", () => {
      expect(window.setTimeout).toHaveBeenCalledWith(
        component.instance().showLoader,
        1000
      )
    })
  })

  describe("after 999ms", () => {
    beforeEach(() => {
      component = getComponent()
      jest.advanceTimersByTime(999)
    })

    it("should render nothing", () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe("after 1001ms", () => {
    beforeEach(() => {
      component = getComponent()
      jest.advanceTimersByTime(1001)
    })

    it("should render", () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe("when unmounted", () => {
    let instance: Loader

    beforeEach(() => {
      component = getComponent()
      instance = component.instance()
      component.unmount()
    })

    it("should call clearTimeout", () => {
      expect(window.clearTimeout).toHaveBeenCalledWith(instance.timeoutId)
    })
  })
})
