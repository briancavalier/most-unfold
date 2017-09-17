// @flow
import type { Stream } from '@most/types'
import { continueWith } from '@most/core'

export const unfold = <A, B>(f: B => [Stream<A>, B], b: B): Stream<A> =>
  stepUnfold(f, f(b))

const stepUnfold = <A, B>(f: B => [Stream<A>, B], [s, b]: [Stream<A>, B]): Stream<A> =>
  continueWith(() => stepUnfold(f, f(b)), s)
