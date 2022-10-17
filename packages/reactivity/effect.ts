let activeEffect

class ReactiveEffect {
  private _fn: Function

  constructor(fn: Function) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    activeEffect = this
    this._fn = fn
  }

  run() {
    return this._fn()
  }
}

const targetMap = new WeakMap()

export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetMap.get(target)

  if (!depsMap)
    targetMap.set(target, (depsMap = new Map()))

  let dep: Set<Function> = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return

  const dep = depsMap.get(key)

  for (const effect of dep)
    effect.run()
}

export function effect(fn: Function) {
  const _efdfect = new ReactiveEffect(fn)

  _efdfect.run()
}
