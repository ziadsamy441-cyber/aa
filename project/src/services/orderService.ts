import type { Order } from '@/types';

// Mock order service — will be replaced by Spring Boot REST calls.
function delay<T>(data: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function generateOrderId(): string {
  return `TT-${Date.now().toString(36).toUpperCase()}`;
}

export const orderService = {
  async createOrder(
    orderData: Omit<Order, 'id' | 'status' | 'createdAt'>
  ): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: generateOrderId(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    return delay(order, 300);
  },

  async getOrderById(id: string): Promise<Order | null> {
    return delay(null);
  },
};
