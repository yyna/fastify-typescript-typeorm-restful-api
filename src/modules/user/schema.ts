import { errorSchema } from '../error/schema'

export const userSchema = {
    id: { type: 'number' },
    email: { type: 'string' },
    password: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
}

export const signUpSchema = {
    summary: 'Sign Up',
    description: 'create new user',
    body: {
        type: 'object',
        required: ['email', 'password'],
        propertyNames: { enum: ['email', 'password'] },
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
        },
        response: {
            201: {
                type: 'object',
            },
            400: {
                type: 'object',
                properties: errorSchema,
            },
            409: {
                type: 'object',
                properties: errorSchema,
            },
        },
    },
}

export const signInSchema = {
    summary: 'Sign In',
    description: 'sign in',
    body: {
        type: 'object',
        required: ['email', 'password'],
        propertyNames: { enum: ['email', 'password'] },
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    token: { type: 'string' },
                },
            },
            400: {
                type: 'object',
                properties: errorSchema,
            },
            401: {
                type: 'object',
                properties: errorSchema,
            },
        },
    },
}
