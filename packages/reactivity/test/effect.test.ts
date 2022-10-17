import { reactive } from '../reactive'
import { effect } from '../effect'

describe('effect', () => {
  it('test', () => {
    const user = reactive({
      name: 'kuizuo',
      age: 20,
    })

    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })

    expect(nextAge).toBe(21)
    user.age++
    expect(nextAge).toBe(22)
  })
})
