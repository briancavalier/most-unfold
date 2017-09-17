// @flow
import { describe, it } from 'mocha'
import { eq } from '@briancavalier/assert'

import { unfold } from './index'
import type { Stream } from '@most/types'
import { at, never, runEffects, tap, until } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'

const collect = <A>(ticks: number, stream: Stream<A>): Promise<A[]> => {
  const events = []
  const collectStream = tap(x => events.push(x), until(at(ticks, 0), stream))
  return runEffects(collectStream, newDefaultScheduler())
    .then(() => events)
}

describe('unfold', () => {
  it('should compute a stream piecewise', () => {
    const f = b => b === 0
      ? [never(), 0]
      : [at(1, b), b - 1]

    return collect(10, unfold(f, 3))
      .then(events => eq([3, 2, 1], events))
  })
})
