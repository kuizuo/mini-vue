import { reactive } from '../reactive'

describe('reactive', () => {
  it('', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})
