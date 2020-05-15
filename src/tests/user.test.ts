import createServer from '../server'

describe('user', () => {
    const server = createServer(false)

    beforeAll(async () => {
        await server.ready()
    })
    afterAll(() => server.close())

    ///////////////////////////////////////////////////////////////////// sign up
    it('POST /sign-up returns 201', async (done) => {
        const testPayload = {
            email: 'test_4454@newemail.com',
            password: 'password123',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/sign-up',
            payload: testPayload,
        })
        expect(statusCode).toBe(201)
        done()
    })

    it('POST /sign-up with invalid payload returns 400', async (done) => {
        const testPayload = {
            email: 'test_53@newemail.com',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/sign-up',
            payload: testPayload,
        })
        expect(statusCode).toBe(400)
        done()
    })

    it('POST /sign-up with duplicate email returns 409', async (done) => {
        const testPayload = {
            email: 'test_24@newemail.com',
            password: 'password123',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/sign-up',
            payload: testPayload,
        })
        expect(statusCode).toBe(409)
        done()
    })

    ///////////////////////////////////////////////////////////////////// sign in

    it('POST /sign-in returns 200', async (done) => {
        const testPayload = {
            email: 'test_45@newemail.com',
            password: 'password123',
        }
        const { statusCode, payload } = await server.inject({
            method: 'POST',
            url: '/sign-in',
            payload: testPayload,
        })
        expect(statusCode).toBe(200)
        expect(JSON.parse(payload)).toHaveProperty('token')
        done()
    })

    it('POST /sign-in with invalid payload returns 400', async (done) => {
        const testPayload = {
            email: 'test_45@newemail.com',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/sign-in',
            payload: testPayload,
        })
        expect(statusCode).toBe(400)
        done()
    })

    it('POST /sign-in with wrong password returns 401', async (done) => {
        const testPayload = {
            email: 'test_45@newemail.com',
            password: 'wrongpassword',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/sign-in',
            payload: testPayload,
        })
        expect(statusCode).toBe(401)
        done()
    })
})
