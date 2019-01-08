import { Service, Context } from 'egg'
import { GreetingModel, UserInfoModel} from '../model'
import UserInfo from '../model/UserInfo'

export default class Home extends Service {
  constructor(ctx: Context) {
    super(ctx)
  }

  public async greet({ name }: { name: string }): Promise<string> {
    const { app } = this
    const greetingRepository  = app.typeorm.getRepository(GreetingModel)
    const user = await greetingRepository.findOne({
      name
    })
    if (!user) {
      return 'Hello Anonymous'
    }
    return `Hello ${user.greeting}`
  }

  public async isAdmin({ name }: { name: string}): Promise<boolean> {
    const { app } = this
    if (app.config.admin.includes(name)) {
      return true
    }
    return false
  }

  /*
  对UserInfo表的增删改查
  */
 // 添加用户
 public async addUser( name: string, sex: string, score: number) {
   const { app } = this
   const userRepository = app.typeorm.getRepository(UserInfoModel)
   // 根据传入的参数创建User
   const user = new UserInfo()
   user.name = name
   user.sex = sex
   user.score = score

   await userRepository.save(user) // 如果存在，更新；不存在，增加。
  }

  // 删除用户
  public async delUser({ name }: { name: string }) {
    const { app } = this
    const userRepository = app.typeorm.getRepository(UserInfoModel)
    const user = await userRepository.findOne({
      name
    })
    // 存在用户就删除
    if (user) {
      await userRepository.remove(user)
    }
  }

  // 更新用户 修改对应名字用户的分数
  public async updateUser(name: string, score: number) {
    const { app } = this
    const userRepository = app.typeorm.getRepository(UserInfoModel)
    const user = await userRepository.findOne({
      name
    })
    // 存在用户就更新
    if (user) {
      console.log(user)
      user.score = score
      await userRepository.save(user)
    }
  }

}
