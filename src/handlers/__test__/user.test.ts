
import * as user from '../user'
describe("POST /user", () => { 
    it("reponse with json", async () => {
        const request = { body: { username: "hello", password: "hola" } }
        const response = {
            json({ token }) {
            expect(token).toBeTruthy()
        }}
        await user.createUser(request, response, () => { })
    })
 })
