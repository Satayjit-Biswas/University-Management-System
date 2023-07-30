import { User } from './user.model';

export const findlastUserID = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const generatedUserID = async () => {
  const currentId = (await findlastUserID()) || (0).toString().padStart(5, '0'); //000000

  // increment by 1
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  return incrementId;

  // lastUserId++
  // return String(lastUserId).padStart(5, '0')
};