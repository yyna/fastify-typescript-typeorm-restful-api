import fastify from 'fastify'
import { ServerResponse } from 'http'

export class CustomError extends Error {
    statusCode: number
    message: string

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
    }
}

export function errorHandler(
    error: fastify.FastifyError,
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply<ServerResponse>
): void {
    const statusCode = error.statusCode || 500
    const message = error.message || 'INTERNAL_SERVER_ERROR'

    // check validation eror
    if (error.validation) {
        reply.code(400).send({
            statusCode: 400,
            message: error.validation[0].message,
        })
    } else {
        reply.code(statusCode).send({
            statusCode,
            message,
        })
    }
}
