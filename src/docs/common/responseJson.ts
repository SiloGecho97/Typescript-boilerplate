export default {
  '201': {
    description: 'Event created successfully',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Success',
        },
      },
    },
  },
  '400': {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  },
  '500': {
    description: 'Internal Server error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error',
        },
      },
    },
  },
}
