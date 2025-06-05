import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { z } from 'zod';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { randomUUID } from 'node:crypto';

import { db } from '../db/client.ts';
import { schema } from '../db/schema/index.ts';
import { dispatchOrderCreated } from '../broker/messages/order-created.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: '*' });

app.get('/health', () => {
  return 'OK'
});

app.post('/orders', {
  schema: {
    body: z.object({
      amount: z.coerce.number(),
    })
  }
}, async (request, reply) => {
  const { amount } = request.body;
  console.log('Creating an order with amount', amount);

  const orderId = randomUUID();

  dispatchOrderCreated({
    orderId,
    amount,
    customer: {
      id: '61bbbaa6-dbff-48f9-b14e-1691e7ef879c',
    },
  })

  try {
    await db.insert(schema.orders).values({
      id: randomUUID(),
      customerId: '61bbbaa6-dbff-48f9-b14e-1691e7ef879c',
      amount,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error inserting order into database:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }

  return reply.status(201).send();
})

app.listen({ host: '0.0.0.0', port: 3333 }).then(() => {
  console.log('[orders] HTTP Server running');
})