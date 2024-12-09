import { subscribersAccess } from '../access-layers/subscribers';

export const subscriberService = {
  async addNewSubscriber(email) {
    return await subscribersAccess.addSubscriber(email);
  }
}; 