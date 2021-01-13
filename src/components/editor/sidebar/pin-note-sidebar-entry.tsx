/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from './sidebar-button'

export const PinNoteSidebarEntry: React.FC = () => {
  useTranslation()

  const isPinned = true
  const i18nKey = isPinned ? 'editor.documentBar.pinNoteToHistory' : 'editor.documentBar.pinnedToHistory'

  return (
    <SidebarButton icon={'thumb-tack'}>
      <Trans i18nKey={i18nKey}/>
    </SidebarButton>
  )
}
