import responseJson from '../../common/responseJson'

export default {
  '/customer/add-area': {
    post: {
      tags: ['Provider data'],
      description: 'Description of api',
      operationId: 'createEvent',
      parameters: [],
      requestBody: {
        required: true,
        description: ' description: A JSON object containing event information',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CustomerRegister',
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
