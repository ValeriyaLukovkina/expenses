import Token from '@/Model/Token';
import jwt from 'jsonwebtoken';

export interface IDto {
  id: string;
  email: string;
  name: string;
  isActivated: boolean;
}

export const generateToken = (dto: IDto) => {
  const accessToken = jwt.sign(dto, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '30m',
  });
  const refreshToken = jwt.sign(dto, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const saveToken = async (userId: string, refreshToken: string) => {
  const tokenData = await Token.findOne({ user: userId });
  if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
  }

  const token = await Token.create({ user: userId, refreshToken });
  return token;
};
