// @flow
import type { Stream } from '@most/types'
import { map, startWith, switchLatest } from '@most/core'

// Create a stream that acts like the result of f(a) initially,
// and when each event arrives in sa, map it with f and switch to it.
export const unfold = <A, B> (f: A => Stream<B>, a: A, sa: Stream<A>): Stream<B> =>
  switchLatest(map(f, startWith(a, sa)))
