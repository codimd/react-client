/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import { Config } from '../../api/config/types'
import { ConfigActions, ConfigActionType, SetConfigAction } from './types'

export const initialState: Config = {
  allowAnonymous: true,
  allowRegister: true,
  authProviders: {
    facebook: false,
    github: false,
    twitter: false,
    gitlab: false,
    dropbox: false,
    ldap: false,
    google: false,
    saml: false,
    oauth2: false,
    internal: false,
    openid: false
  },
  branding: {
    name: '',
    logo: ''
  },
  banner: {
    text: '',
    timestamp: ''
  },
  customAuthNames: {
    ldap: '',
    oauth2: '',
    saml: ''
  },
  freeUrlMode: false,
  maxDocumentLength: 0,
  useImageProxy: false,
  plantumlServer: null,
  specialLinks: {
    privacy: '',
    termsOfUse: '',
    imprint: ''
  },
  version: {
    version: '',
    sourceCodeUrl: '',
    issueTrackerUrl: ''
  },
  iframeCommunication: {
    editorOrigin: '',
    rendererOrigin: ''
  }
}

export const ConfigReducer: Reducer<Config, ConfigActions> = (state: Config = initialState, action: ConfigActions) => {
  switch (action.type) {
    case ConfigActionType.SET_CONFIG:
      return (action as SetConfigAction).state
    default:
      return state
  }
}
