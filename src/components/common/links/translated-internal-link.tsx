/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import { useTranslation } from 'react-i18next'
import { InternalLink } from './internal-link'
import { TranslatedLinkProps } from './types'

export const TranslatedInternalLink: React.FC<TranslatedLinkProps> = ({ i18nKey, i18nOption, ...props }) => {
  const { t } = useTranslation()
  return (
    <InternalLink text={t(i18nKey, i18nOption)} {...props}/>
  )
}
