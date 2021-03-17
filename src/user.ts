import {
  MemoryTransport,
  createTransportHandler,
  createTransportApi,
} from '../deps.ts'
import { UserApi } from './user.api.ts'

const transport = new MemoryTransport()

await transport.init()

// transport.on('User.login', ({ payload }) => {
//   const { username, password } = payload as any

//   return username === password
// })

const handler = createTransportHandler<UserApi>(transport)

handler.on(
  x => x.Command.User.login,
  async (_, payload) => {
    const isSuccess = payload.username === payload.password

    if (isSuccess) {
      await api.publish.Event.userLoggedIn({
        username: payload.username,
        timestamp: new Date(),
      })
    }

    return isSuccess
  },
)

await transport.start()

// const result = await transport.execute({
//   route: 'User.login',
//   payload: {
//     username: 'Me',
//     password: 'Me',
//   },
// })

const api = createTransportApi<UserApi>(transport)

const result = await api.execute.Command.User.login({
  username: 'Me',
  password: 'Me',
})

console.log('result', result)

await transport.dispose()
