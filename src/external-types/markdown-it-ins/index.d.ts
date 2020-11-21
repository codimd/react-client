/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

declare module 'markdown-it-ins' {
  import MarkdownIt from 'markdown-it/lib'
  const markdownItInserted: MarkdownIt.PluginSimple
  export = markdownItInserted
}
