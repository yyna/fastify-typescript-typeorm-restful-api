import fp from 'fastify-plugin'
import bcrypt from 'bcrypt'
import { CustomError } from '../../middleware/error'
import { signUpSchema, signInSchema } from './schema'

export default fp((server, opts, next) => {
    // sign up
    server.post(
        '/sign-up',
        { schema: signUpSchema },
        async (request, reply) => {
            const { email, password } = request.body
            const user = await server.db.user.findOne({ email })
            if (user) {
                throw new CustomError(409, 'EMAIL_ALREADY_TAKEN')
            } else {
                await server.db.user.save({
                    email,
                    password: bcrypt.hashSync(password, 8),
                })
                reply.code(201).send()
            }
        }
    )

    // sign in
    server.post(
        '/sign-in',
        { schema: signInSchema },
        async (request, reply) => {
            const { email, password } = request.body
            const user = await server.db.user.findOne({ email })

            if (user) {
                // check password
                if (bcrypt.compareSync(password, user.password)) {
                    const token = server.jwt.sign(user.id)
                    reply.code(200).send({ token })
                }
                // password mismatch
                else {
                    throw new CustomError(401, 'PASSWORD_MISMATCH')
                }
            } else {
                throw new CustomError(404, 'USER_NOT_FOUND')
            }
        }
    )

    next()
})
