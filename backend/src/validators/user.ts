import { countUserByIdInDB, countUserByLoginInDB } from '../controllers/dbControllers/user';

export async function checkIfUserExistById(userId: string) {
  return 1 === (await countUserByIdInDB(userId));
}

export async function checkIfUserExistByLogin(userLogin: string) {
  return 1 === (await countUserByLoginInDB(userLogin));
}
