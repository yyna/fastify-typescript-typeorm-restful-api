import createServer from '../server'

const authorization =
    'Bearer eyJhbGciOiJIUzI1NiJ9.OA.js48FIgILqymwWUN1bKp3nQCqp4Dyv9OUvruG9rKpvQ'

describe('memo', () => {
    const server = createServer(false)
    beforeAll(async () => {
        await server.ready()
    })
    afterAll(() => server.close())

    ///////////////////////////////////////////////////////////////////// get memo list
    it('GET /memo returns 200', async (done) => {
        const { statusCode } = await server.inject({
            method: 'GET',
            url: '/memo',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(200)
        done()
    })

    it('GET /memo without token returns 401', async (done) => {
        const { statusCode } = await server.inject({
            method: 'GET',
            url: '/memo',
        })
        expect(statusCode).toBe(401)
        done()
    })

    ///////////////////////////////////////////////////////////////////// get memo
    it('GET /memo/:id returns 200', async (done) => {
        const { statusCode } = await server.inject({
            method: 'GET',
            url: '/memo/19',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(200)
        done()
    })

    it('GET /memo/:id without token returns 401', async (done) => {
        const { statusCode } = await server.inject({
            method: 'GET',
            url: '/memo/19',
        })
        expect(statusCode).toBe(401)
        done()
    })

    it('GET /memo/:id without ownership returns 403', async (done) => {
        const { statusCode } = await server.inject({
            method: 'GET',
            url: '/memo/21',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(403)
        done()
    })

    it('GET /memo/:id not found returns 404', async (done) => {
        const { statusCode } = await server.inject({
            method: 'GET',
            url: '/memo/1234',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(404)
        done()
    })

    ///////////////////////////////////////////////////////////////////// post memo
    it('POST /memo returns 201', async (done) => {
        const testPayload = {
            title: 'title_test',
            content: 'content_test',
        }
        const { statusCode, payload } = await server.inject({
            method: 'POST',
            url: '/memo',
            headers: {
                authorization,
            },
            payload: testPayload,
        })
        expect(statusCode).toBe(201)
        expect(JSON.parse(payload).memo).toEqual(
            expect.objectContaining(testPayload)
        )
        done()
    })

    it('POST /memo with invalid payload returns 400', async (done) => {
        const testPayload = {
            content: 'content_test',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/memo',
            payload: testPayload,
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(400)
        done()
    })

    it('POST /memo without token returns 401', async (done) => {
        const testPayload = {
            title: 'title_test',
            content: 'content_test',
        }
        const { statusCode } = await server.inject({
            method: 'POST',
            url: '/memo',
            payload: testPayload,
        })
        expect(statusCode).toBe(401)
        done()
    })

    ///////////////////////////////////////////////////////////////////// update memo
    it('PATCH /memo/:id returns 200', async (done) => {
        const testPayload = {
            title: 'new title',
        }
        const { statusCode, payload } = await server.inject({
            method: 'PATCH',
            url: '/memo/19',
            payload: testPayload,
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(200)
        expect(JSON.parse(payload).memo.title).toBe(testPayload.title)
        done()
    })

    it('PATCH /memo/:id with invalid payload returns 400', async (done) => {
        const testPayload = {
            hi: 'hello',
        }
        const { statusCode } = await server.inject({
            method: 'PATCH',
            url: '/memo/19',
            payload: testPayload,
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(400)
        done()
    })

    it('PATCH /memo/:id without token returns 401', async (done) => {
        const { statusCode } = await server.inject({
            method: 'PATCH',
            url: '/memo/19',
        })
        expect(statusCode).toBe(401)
        done()
    })

    it('PATCH /memo/:id without ownership returns 403', async (done) => {
        const testPayload = {
            title: 'new title',
        }
        const { statusCode } = await server.inject({
            method: 'PATCH',
            url: '/memo/21',
            headers: {
                authorization,
            },
            payload: testPayload,
        })
        expect(statusCode).toBe(403)
        done()
    })

    it('PATCH /memo/:id not found returns 404', async (done) => {
        const testPayload = {
            title: 'new title',
        }
        const { statusCode } = await server.inject({
            method: 'PATCH',
            url: '/memo/1234',
            headers: {
                authorization,
            },
            payload: testPayload,
        })
        expect(statusCode).toBe(404)
        done()
    })

    ///////////////////////////////////////////////////////////////////// delete memo
    it('DELETE /memo/:id returns 200', async (done) => {
        const { statusCode } = await server.inject({
            method: 'DELETE',
            url: '/memo/34',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(200)
        done()
    })

    it('DELETE /memo/:id without token returns 401', async (done) => {
        const { statusCode } = await server.inject({
            method: 'DELETE',
            url: '/memo/76',
        })
        expect(statusCode).toBe(401)
        done()
    })

    it('DELETE /memo/:id without ownership returns 403', async (done) => {
        const { statusCode } = await server.inject({
            method: 'DELETE',
            url: '/memo/21',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(403)
        done()
    })

    it('DELETE /memo/:id not found returns 404', async (done) => {
        const { statusCode } = await server.inject({
            method: 'DELETE',
            url: '/memo/1234',
            headers: {
                authorization,
            },
        })
        expect(statusCode).toBe(404)
        done()
    })
})
