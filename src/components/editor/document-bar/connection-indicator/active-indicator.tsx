/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import './active-indicator.scss'
import React from 'react'

export enum ActiveIndicatorStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface ActiveIndicatorProps {
  status: ActiveIndicatorStatus;
}

export const ActiveIndicator: React.FC<ActiveIndicatorProps> = ({ status }) => {
  return (
    <span className={`activeIndicator ${status}`}/>
  )
}
