import { Controller, Context } from 'egg'

// 被import
export default class HomeController extends Controller {
  constructor(ctx: Context) { // 上下文：可以获取到当前工程下
    super(ctx)
    this.getRequestPayload = ctx.helper.getRequestPayload
    this.stdout = ctx.helper.stdout
    this.stderr = ctx.helper.stderr
  }

  public async alive() {
    const { ctx } = this
    try {
      this.stdout(ctx, 'alive')
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  public async greet() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string'
      }, payload)
      const data = await this.service.home.greet(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  public async isAdmin() {
    const { ctx } = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string'
      }, payload)
      const data = await this.service.home.isAdmin(payload)
      this.stdout(ctx, data)
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 添加用户
  public async addUser() {
    const {ctx} = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string',
        sex: 'string',
        score: 'string'
      }, payload)
      //
      const {name, sex, score } = payload
      await this.service.home.addUser(name, sex, score)
      // const data = await this.service.home.isAdmin(payload)
      this.stdout(ctx, 'Added successfully')
    } catch (err) {
      this.stderr(ctx, err)
    }
  }

  // 删除用户
  public async delUser() {
    const {ctx} = this
    try {
      const payload = this.getRequestPayload(ctx)
      ctx.validate({
        name: 'string',
      }, payload)
      await this.service.home.delUser(payload)
      this.stdout(ctx, 'Deleted successfully')
    } catch (err) {
      this.stderr(ctx, err)
    }
  }
}
