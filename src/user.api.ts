import { ApiWithExecutableKeys } from '../deps.ts'

type Api = {
  Command: {
    User: {
      login: (props: {
        username: string
        password: string
      }) => Promise<boolean>
    }
  }

  Event: {
    userLoggedIn: (props: {
      username: string
      timestamp: Date
    }) => Promise<void>
  }
}

export type UserApi = ApiWithExecutableKeys<Api, 'Command'>
