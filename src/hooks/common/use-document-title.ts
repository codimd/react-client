/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'

export const useDocumentTitle = (title?: string): void => {
  const brandingName = useSelector((state: ApplicationState) => state.config.branding.name)

  useEffect(() => {
    document.title = `${ title ? title + ' - ' : '' }HedgeDoc ${ brandingName ? ` @ ${ brandingName }` : '' }`
  }, [brandingName, title])
}
