import { v4 } from 'uuid'

export const genConfirmationEmailLink = async (url, userId, redis) => {
  try {
    const id = v4();
    await redis.set(id, userId, "ex", 60 * 60 * 24);
    return `${url}/confirm/${id}`;
  } catch (error) {
    throw error;
  }

}
