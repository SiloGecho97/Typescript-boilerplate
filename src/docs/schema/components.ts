import createEvent from './createEventSchema'

export default {
  components: {
    schemas: {
      ...createEvent,
      Error: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
          error: {
            type: 'string',
          },
        },
      },
      Success: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          data: {
            type: 'object',
          },
        },
      },
    },
  },
}
