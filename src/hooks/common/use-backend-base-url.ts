/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const mockBackendUrl = '/mock-backend/'

export const useBackendBaseUrl = (): string => {
  return process.env.REACT_APP_BACKEND_BASE_URL ?? mockBackendUrl
}
