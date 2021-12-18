import responseJson from '../../common/responseJson'

export default {
  '/retailer/register': {
    post: {
      tags: ['Player data'],
      description: 'Description.',
      operationId: 'createEvent',
      parameters: [],
      requestBody: {
        required: true,
        description: ' description: A JSON object containing event information',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlayerRegistration',
            },
          },
        },
      },
      responses: {
        ...responseJson,
      },
    },
  },
}
