/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ExternalLink } from './external-link'
import { TranslatedLinkProps } from './types'

export const TranslatedExternalLink: React.FC<TranslatedLinkProps> = ({ i18nKey, i18nOption, ...props }) => {
  useTranslation()
  return (
    <ExternalLink { ...props }>
      <Trans i18nKey={ i18nKey } tOptions={ i18nOption }/>
    </ExternalLink>
  )
}
