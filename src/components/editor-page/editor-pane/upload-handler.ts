/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor } from 'codemirror'
import i18n from 'i18next'
import { uploadFile } from '../../../api/media'
import { store } from '../../../redux'
import { supportedMimeTypes } from '../../common/upload-image-mimetypes'
import { replaceInMarkdownContent } from '../../../redux/note-details/methods'

export const handleUpload = (file: File, editor: Editor): void => {
  if (!file) {
    return
  }
  if (!supportedMimeTypes.includes(file.type)) {
    return
  }
  const cursor = editor.getCursor()
  const randomId = Math.random().toString(36).substr(7)
  const label = i18n.t('editor.upload.uploadFile', { fileName: file.name })
  const uploadPlaceholder = `![${label}](upload-${randomId})`
  const noteId = store.getState().noteDetails.id
  const insertCode = (replacement: string) => {
    replaceInMarkdownContent(uploadPlaceholder, replacement)
  }

  editor.replaceRange(uploadPlaceholder, cursor, cursor, '+input')
  uploadFile(noteId, file)
    .then(({ link }) => {
      insertCode(`![](${link})`)
    })
    .catch((error) => {
      console.error('error while uploading file', error)
      insertCode(`![upload of ${file.name} failed]()`)
    })
}
