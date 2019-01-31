import mongoose from 'mongoose';

export const isValidMongoId = ( id ) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return true;
  } else { return false; }
}