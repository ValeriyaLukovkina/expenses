import User from '../Model/User';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });

    return user;
  } catch (error) {
    return null;
  }
};
