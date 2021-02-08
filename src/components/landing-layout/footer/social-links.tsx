/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import links from '../../../links.json'
import { ExternalLink } from '../../common/links/external-link'
import { ReactComponent as DiscourseLogo } from './discourse.svg'
import { ReactComponent as MatrixLogo } from './matrix-org.svg'
import './social-links.scss'

export const SocialLink: React.FC = () => {
  useTranslation()

  return (
    <p className={ 'social-links' }>
      <Trans i18nKey="landing.footer.followUs" components={ [
        <ExternalLink href={ links.githubOrg } icon='github' text="GitHub"/>,
        <ExternalLink href={ links.community } text="Discourse" children={ [<DiscourseLogo/>] }/>,
        <ExternalLink href={ links.chat } text="Matrix" children={ [<MatrixLogo/>] }/>,
        <ExternalLink href={ links.mastodon } icon='mastodon' text="Mastodon"/>,
        <ExternalLink href={ links.translate } icon="globe" text="POEditor"/>
      ] }/>
    </p>
  )
}
