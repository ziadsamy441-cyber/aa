import type { CustomOrderRequest, ProductCategory } from '@/types';

// Mock custom order service — will be replaced by Spring Boot REST calls.
function delay<T>(data: T, ms = 200): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function generateRequestId(): string {
  return `CO-${Date.now().toString(36).toUpperCase()}`;
}

export interface CustomOrderSubmission {
  name: string;
  email: string;
  category: ProductCategory;
  description: string;
  budget?: string;
  timeline?: string;
}

export const customOrderService = {
  async submitRequest(
    data: CustomOrderSubmission
  ): Promise<CustomOrderRequest> {
    const request: CustomOrderRequest = {
      ...data,
      id: generateRequestId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    return delay(request, 300);
  },
};
