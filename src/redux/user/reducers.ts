/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import { OptionalUserState, UserActions, UserActionType } from './types'

export const UserReducer: Reducer<OptionalUserState, UserActions> = (
  state: OptionalUserState = null,
  action: UserActions
) => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return action.state
    case UserActionType.CLEAR_USER:
      return null
    default:
      return state
  }
}
