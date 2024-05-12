import { addUserToDB, getUserFromDB } from './dbControllers/user';
import { Request, Response } from 'express';
import { checkIfUserExistByLogin } from '../validators/user';

export async function addUser(req: Request, res: Response) {
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(400).json({
      message: 'login and password are required',
    });
  }

  try {
    if (await checkIfUserExistByLogin(login)) {
      // res.status(400).json({
      //   message: 'User with that login already exist in DB',
      // });

      throw new Error('User with that login already exist in DB');
    }

    const newClient = await addUserToDB(login, password);

    const responseDate = {
      message: 'User added successfully',
      data: {
        newClient: newClient,
      },
    };

    res.status(201).json(responseDate);
  } catch (e) {
    console.error('ERROR:', e);

    res.status(400).json({
      message: 'error',
      data: {
        error: e,
      },
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(400).json({
      message: 'login and password are required',
    });
  }

  try {
    if (!(await checkIfUserExistByLogin(login))) {
      res.status(404).json({
        message: 'user with that login do not exist in DB',
      });
    }

    const user = await getUserFromDB(login, password);

    if (user) {
      res.status(200).json({
        message: 'User found',
        data: {
          user: user,
        },
      });
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (e: any) {
    console.error('ERROR:', e);

    res.status(400).json({
      message: 'error',
      data: {
        error: e,
      },
    });
  }
}
