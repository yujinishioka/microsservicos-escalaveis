import { orders } from "./channels/orders.ts";

orders.consume('orders', async message => {
  if(!message) {
    return null;
  }

  orders.ack(message);
  console.log(`[invoices] Received message: ${message?.content.toString()}`);
}, {
  noAck: false,
})