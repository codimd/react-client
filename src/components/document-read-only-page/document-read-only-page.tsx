/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { useDocumentTitleWithNoteTitle } from '../../hooks/common/use-document-title-with-note-title'
import { useNoteMarkdownContent } from '../../hooks/common/use-note-markdown-content'
import { ApplicationState } from '../../redux'
import { setNoteFrontmatter, updateNoteTitleByFirstHeading } from '../../redux/note-details/methods'
import { MotdBanner } from '../common/motd-banner/motd-banner'
import { ShowIf } from '../common/show-if/show-if'
import { AppBar, AppBarMode } from '../editor-page/app-bar/app-bar'
import { EditorPagePathParams } from '../editor-page/editor-page'
import { useLoadNoteFromServer } from '../editor-page/hooks/useLoadNoteFromServer'
import { RenderIframe } from '../editor-page/renderer-pane/render-iframe'
import { DocumentInfobar } from './document-infobar'
import { ErrorWhileLoadingNoteAlert } from './ErrorWhileLoadingNoteAlert'
import { LoadingNoteAlert } from './LoadingNoteAlert'

export const DocumentReadOnlyPage: React.FC = () => {

  useTranslation()
  const { id } = useParams<EditorPagePathParams>()

  useApplyDarkMode()
  useDocumentTitleWithNoteTitle()

  const onFirstHeadingChange = useCallback(updateNoteTitleByFirstHeading, [])
  const onFrontmatterChange = useCallback(setNoteFrontmatter, [])
  const [error, loading] = useLoadNoteFromServer()
  const markdownContent = useNoteMarkdownContent()
  const noteDetails = useSelector((state: ApplicationState) => state.noteDetails)

  return (
    <div className={'d-flex flex-column mvh-100 bg-light'}>
      <MotdBanner/>
      <AppBar mode={AppBarMode.BASIC}/>
      <div className={'container'}>
        <ErrorWhileLoadingNoteAlert show={error}/>
        <LoadingNoteAlert show={loading}/>
      </div>
      <ShowIf condition={!error && !loading}>
        <DocumentInfobar
          changedAuthor={noteDetails.lastChange.userId ?? ''}
          changedTime={noteDetails.lastChange.timestamp}
          createdAuthor={'Test'}
          createdTime={noteDetails.createTime}
          editable={true}
          noteId={id}
          viewCount={noteDetails.viewCount}
        />
        <RenderIframe extraClasses={"flex-fill"}
                      markdownContent={markdownContent}
                      onFirstHeadingChange={onFirstHeadingChange}
                      onFrontmatterChange={onFrontmatterChange}/>
      </ShowIf>
    </div>
  )
}