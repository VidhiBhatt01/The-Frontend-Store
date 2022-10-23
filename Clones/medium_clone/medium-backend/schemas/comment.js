export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string',
        },
        {
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            description: 'Comment would not show on site without approval.'
        },
        {
            name: 'email',
            type: 'string',
        },
        {
            name: 'comment',
            type: 'text',
        },
        {
            name: 'post',
            type: 'reference',
            to: [{ type: 'post' }],
        },

    ],
}
