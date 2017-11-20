// @flow
import { describe, it } from 'mocha'
import { eq } from '@briancavalier/assert'

import { unfold } from './index'
import type { Stream } from '@most/types'
import { at, mergeArray, runEffects, tap, until } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'

const collect = <A>(ticks: number, stream: Stream<A>): Promise<A[]> => {
  const events = []
  const collectStream = tap(x => events.push(x), until(at(ticks, 0), stream))
  return runEffects(collectStream, newDefaultScheduler())
    .then(() => events)
}

describe('unfold', () => {
  it('should compute a stream piecewise', () => {
    const f = b => at(1, b)
    const s = mergeArray([at(10, 1), at(20, 2), at(30, 3)])

    return collect(40, unfold(f, 0, s))
      .then(events => eq([0, 1, 2, 3], events))
  })
})
