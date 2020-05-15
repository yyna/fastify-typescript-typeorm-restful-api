import { errorSchema } from '../error/schema'

export const memoSchema = {
    id: { type: 'number' },
    title: { type: 'string' },
    content: { type: 'string' },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
}

export const getMemoListSchema = {
    summary: 'Memo List',
    description: 'memo list of user',
    response: {
        200: {
            type: 'object',
            properties: {
                memos: {
                    type: 'array',
                    items: {
                        properties: memoSchema,
                    },
                },
            },
        },
        401: {
            type: 'object',
            properties: errorSchema,
        },
    },
}

export const getMemoSchema = {
    summary: 'Memo Item',
    description: 'get memo by id',
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                memo: {
                    type: 'object',
                    properties: memoSchema,
                },
            },
        },
        401: {
            type: 'object',
            properties: errorSchema,
        },
        403: {
            type: 'object',
            properties: errorSchema,
        },
        404: {
            type: 'object',
            properties: errorSchema,
        },
    },
}

export const postMemoSchema = {
    summary: 'New Memo',
    description: 'create new memo',
    body: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
    },
    response: {
        201: {
            type: 'object',
            properties: {
                memo: {
                    type: 'object',
                    properties: memoSchema,
                },
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
}

export const updateMemoSchema = {
    summary: 'Update Memo',
    description: 'update memo',
    body: {
        type: 'object',
        propertyNames: { enum: ['title', 'content'] },
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
    },
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                memo: {
                    type: 'object',
                    properties: memoSchema,
                },
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
        403: {
            type: 'object',
            properties: errorSchema,
        },
        404: {
            type: 'object',
            properties: errorSchema,
        },
    },
}

export const deleteMemoSchema = {
    summary: 'Delete Memo',
    description: 'delete memo',
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'object',
        },
        401: {
            type: 'object',
            properties: errorSchema,
        },
        403: {
            type: 'object',
            properties: errorSchema,
        },
        404: {
            type: 'object',
            properties: errorSchema,
        },
    },
}
