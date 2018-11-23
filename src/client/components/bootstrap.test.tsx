import React from "react"
import { shallow, ShallowWrapper } from "enzyme"

import Bootstrap, {
  Props as BootstrapProps,
  State as BootstrapState,
} from "./bootstrap"

describe("Bootstrap", () => {
  const props = {
    url: "/test/123",
    children: jest.fn(data => <div>Test: {data}</div>),
  }
  const getComponent = ({ disableLifecycleMethods = false } = {}) =>
    shallow<Bootstrap<string>>(<Bootstrap<string> {...props} />, {
      disableLifecycleMethods,
    })

  let component: ShallowWrapper<
    BootstrapProps<string>,
    BootstrapState<string>,
    Bootstrap<string>
  >
  let RealFetch: GlobalFetch["fetch"]
  let MockFetch: jest.Mock

  beforeEach(() => {
    jest.spyOn(Bootstrap.prototype, "safeSetState")
    RealFetch = window.fetch
    MockFetch = jest.fn()
    window.fetch = MockFetch
  })

  afterEach(() => {
    window.fetch = RealFetch
  })

  describe("initially", () => {
    it("should render nothing", () => {
      expect(getComponent({ disableLifecycleMethods: true })).toMatchSnapshot()
    })
  })

  describe("when mounted", () => {
    beforeEach(() => {
      // tslint:disable-next-line:no-empty
      const executor = () => {}
      MockFetch.mockReturnValue(new Promise(executor))
      component = getComponent()
    })

    it("should set mounted flag", () => {
      expect(component.instance().mounted).toEqual(true)
    })

    it("should call safeSetState", () => {
      expect(component.instance().safeSetState).toHaveBeenCalledWith({
        loading: true,
        error: false,
        data: null,
      })
    })

    it("should render Loader", () => {
      expect(component).toMatchSnapshot()
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
      component = getComponent()
    })

    it("should call safeSetState", () => {
      expect(component.instance().safeSetState).toHaveBeenCalledWith({
        loading: false,
        error: true,
        data: null,
      })
    })

    it("should render Error", () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe("when response is not 2xx", () => {
    beforeEach(() => {
      MockFetch.mockReturnValue(Promise.resolve({ ok: false }))
      component = getComponent()
    })

    it("should call safeSetState", () => {
      expect(component.instance().safeSetState).toHaveBeenCalledWith({
        loading: false,
        error: true,
        data: null,
      })
    })

    it("should render Error", () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe("when response is 2xx", () => {
    beforeEach(() => {
      MockFetch.mockReturnValue(
        Promise.resolve({ ok: true, json: () => "123" })
      )
      component = getComponent()
    })

    it("should call safeSetState", () => {
      expect(component.instance().safeSetState).toHaveBeenCalledWith({
        loading: false,
        error: false,
        data: "123",
      })
    })

    it("should call props.children", () => {
      expect(props.children).toHaveBeenCalledWith("123")
    })

    it("should render props.children", () => {
      expect(component).toMatchSnapshot()
    })
  })

  describe("when unmounted", () => {
    let instance: Bootstrap<string>

    beforeEach(() => {
      // tslint:disable-next-line:no-empty
      const executor = () => {}
      MockFetch.mockReturnValue(new Promise(executor))
      component = getComponent()
      instance = component.instance()
      component.unmount()
    })

    it("should unset mounted flag", () => {
      expect(instance.mounted).toEqual(false)
    })
  })

  describe("methods", () => {
    describe("safeSetState", () => {
      const state = {
        loading: true,
        error: true,
        data: "123",
      }
      let setStateSpy: jest.SpyInstance
      let instance: Bootstrap<string>

      beforeEach(() => {
        setStateSpy = jest.spyOn(Bootstrap.prototype, "setState")
        instance = getComponent({ disableLifecycleMethods: true }).instance()
      })

      describe("when mounted", () => {
        beforeEach(() => {
          instance.mounted = true
          instance.safeSetState(state)
        })

        it("should call setState", () => {
          expect(setStateSpy).toHaveBeenCalledWith(state)
        })
      })

      describe("when not mounted", () => {
        beforeEach(() => {
          instance.mounted = false
          instance.safeSetState(state)
        })

        it("should call setState", () => {
          expect(setStateSpy).not.toHaveBeenCalled()
        })
      })
    })
  })
})
