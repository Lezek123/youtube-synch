import * as dynamoose from 'dynamoose'
import { ConditionInitializer } from 'dynamoose/dist/Condition'
import { AnyItem } from 'dynamoose/dist/Item'
import { Query, Scan } from 'dynamoose/dist/ItemRetriever'
import { omit } from 'ramda'
import { DYNAMO_MODEL_OPTIONS, IRepository, mapTo } from '.'
import { ResourcePrefix, YtUser } from '../types/youtube'

function createUserModel(tablePrefix: ResourcePrefix) {
  const userSchema = new dynamoose.Schema(
    {
      id: {
        type: String,
        hashKey: true,
      },

      // User email
      email: String,

      // User youtube username
      youtubeUsername: String,

      // User Google ID
      googleId: String,

      // user authorization code
      authorizationCode: String,

      // user access token obtained from authorization code after successful authentication
      accessToken: String,

      // user refresh token that will be used to get new access token after expiration
      refreshToken: String,

      // User avatar url
      avatarUrl: String,

      // User Youtube channels count
      channelsCount: Number,
    },
    {
      saveUnknown: false,
      timestamps: {
        createdAt: {
          createdAt: {
            type: {
              value: Date,
              settings: {
                storage: 'iso',
              },
            },
          },
        },
        updatedAt: {
          updatedAt: {
            type: {
              value: Date,
              settings: {
                storage: 'iso',
              },
            },
          },
        },
      },
    }
  )
  return dynamoose.model(`${tablePrefix}users`, userSchema, DYNAMO_MODEL_OPTIONS)
}

export class UsersRepository implements IRepository<YtUser> {
  private model
  constructor(tablePrefix: ResourcePrefix) {
    this.model = createUserModel(tablePrefix)
  }

  async upsertAll(users: YtUser[]): Promise<YtUser[]> {
    const results = await Promise.all(users.map(async (user) => this.save(user)))
    return results
  }

  async scan(init: ConditionInitializer, f: (q: Scan<AnyItem>) => Scan<AnyItem>): Promise<YtUser[]> {
    const results = await f(this.model.scan(init)).exec()
    return results.map((r) => mapTo<YtUser>(r))
  }

  async get(id: string): Promise<YtUser | undefined> {
    const result = await this.model.get({ id })
    return result ? mapTo<YtUser>(result) : undefined
  }

  async save(user: YtUser): Promise<YtUser> {
    const update = omit(['id', 'updatedAt'], user)
    const result = await this.model.update({ id: user.id }, update)
    return mapTo<YtUser>(result)
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ id })
    return
  }

  async query(init: ConditionInitializer, f: (q: Query<AnyItem>) => Query<AnyItem>) {
    const results = await f(this.model.query(init)).exec()
    return results.map((r) => mapTo<YtUser>(r))
  }
}

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  /**
   * @param userId
   * @returns Returns user
   */
  async get(userId: string): Promise<YtUser> {
    const result = await this.usersRepository.get(userId)
    if (!result) {
      throw new Error(`Could not find user with id ${userId}`)
    }
    return result
  }

  async usersByEmail(search: string): Promise<YtUser[]> {
    // find users with given email
    const result = await this.usersRepository.scan('id', (q) =>
      search ? q.and().attribute('email').contains(search) : q
    )
    return result
  }

  /**
   * @param user
   * @returns Updated user
   */
  async save(user: YtUser): Promise<YtUser> {
    return this.usersRepository.save(user)
  }
}
