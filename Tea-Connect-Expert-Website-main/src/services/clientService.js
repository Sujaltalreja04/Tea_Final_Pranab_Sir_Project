import { mockClients } from '../mock/clients';
import { mockClientRequests } from '../mock/client_request';

export const clientService = {
  // Get all clients
  getAllClients: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockClients);
      }, 500);
    });
  },

  // Get client by ID
  getClientById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const client = mockClients.find(c => c.id === parseInt(id));
        if (client) {
          resolve(client);
        } else {
          reject(new Error('Client not found'));
        }
      }, 300);
    });
  },

  // Get client requests
  getClientRequests: async (clientId = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requests = clientId 
          ? mockClientRequests.filter(r => r.clientId === clientId)
          : mockClientRequests;
        resolve(requests);
      }, 400);
    });
  },

  // Create new client request
  createClientRequest: async (requestData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRequest = {
          id: mockClientRequests.length + 1,
          ...requestData,
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        mockClientRequests.push(newRequest);
        resolve(newRequest);
      }, 600);
    });
  },

  // Update client request status
  updateRequestStatus: async (requestId, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const requestIndex = mockClientRequests.findIndex(r => r.id === requestId);
        if (requestIndex !== -1) {
          mockClientRequests[requestIndex].status = status;
          resolve(mockClientRequests[requestIndex]);
        } else {
          reject(new Error('Request not found'));
        }
      }, 400);
    });
  }
};