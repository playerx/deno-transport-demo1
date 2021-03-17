import { ApiWithExecutableKeys } from '../deps.ts'

type Api = {
  User: {
    login: (props: {
      username: string
      password: string
    }) => Promise<boolean>
  }
}

export type UserApi = ApiWithExecutableKeys<Api, 'User'>
