import fastify from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'

import { errorHandler } from './middleware/error'

import db from './plugins/db'
import auth from './plugins/auth'

import memo from './modules/memo/router'
import user from './modules/user/router'

export default function (logger: boolean = true) {
    const server: fastify.FastifyInstance<
        Server,
        IncomingMessage,
        ServerResponse
    > = fastify({ logger })

    server.register(db)
    server.register(auth)

    // router
    server.register(memo)
    server.register(user)

    server.setErrorHandler(errorHandler)

    return server
}
