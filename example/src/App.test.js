const App = require("./App")
// @ponicode
describe("renderRoutes", () => {
    let inst

    beforeEach(() => {
        inst = new App.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.renderRoutes()
        }
    
        expect(callFunction).not.toThrow()
    })
})
