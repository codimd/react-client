import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Col, ListGroup, Modal, Row, Button } from 'react-bootstrap'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { Trans, useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { getAllRevisions, getRevision, Revision, RevisionListEntry } from '../../../../api/revisions'
import { UserResponse } from '../../../../api/users/types'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal, CommonModalProps } from '../../../common/modals/common-modal'
import { ShowIf } from '../../../common/show-if/show-if'
import { UserAvatar } from '../../../common/user-avatar/user-avatar'
import { RevisionButtonProps } from './revision-button'
import './revision-modal.scss'
import { downloadRevision, getUserDataForRevision } from './utils'

export const RevisionModal: React.FC<CommonModalProps & RevisionButtonProps> = ({ show, onHide, icon, titleI18nKey, noteContent }) => {
  useTranslation()
  const [revisions, setRevisions] = useState<RevisionListEntry[]>([])
  const [selectedRevisionTimestamp, setSelectedRevisionTimestamp] = useState<number | null>(null)
  const [selectedRevision, setSelectedRevision] = useState<Revision | null>(null)
  const [error, setError] = useState(false)
  const revisionAuthorListMap = useRef(new Map<number, UserResponse[]>())
  const revisionCacheMap = useRef(new Map<number, Revision>())
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    getAllRevisions(id).then(fetchedRevisions => {
      fetchedRevisions.forEach(revision => {
        const authorData = getUserDataForRevision(revision.authors)
        revisionAuthorListMap.current.set(revision.timestamp, authorData)
      })
      setRevisions(fetchedRevisions)
      if (fetchedRevisions.length >= 1) {
        setSelectedRevisionTimestamp(fetchedRevisions[0].timestamp)
      }
    }).catch(() => setError(true))
  }, [setRevisions, setError, id])

  useEffect(() => {
    if (selectedRevisionTimestamp === null) {
      return
    }
    const cacheEntry = revisionCacheMap.current.get(selectedRevisionTimestamp)
    if (cacheEntry) {
      setSelectedRevision(cacheEntry)
      return
    }
    getRevision(id, selectedRevisionTimestamp).then(fetchedRevision => {
      setSelectedRevision(fetchedRevision)
      revisionCacheMap.current.set(selectedRevisionTimestamp, fetchedRevision)
    }).catch(() => setError(true))
  }, [selectedRevisionTimestamp, id])

  return (
    <CommonModal show={show} onHide={onHide} titleI18nKey={titleI18nKey} icon={icon} closeButton={true} size={'xl'} additionalClasses='revision-modal'>
      <Modal.Body>
        <Row>
          <Col lg={4} className={'scroll-col'}>
            <ListGroup as='ul'>
              {
                revisions.map((revision, revisionIndex) => {
                  return (
                    <ListGroup.Item
                      as='li'
                      active={selectedRevisionTimestamp === revision.timestamp}
                      onClick={() => setSelectedRevisionTimestamp(revision.timestamp)}
                      className='user-select-none revision-item' key={revisionIndex}
                    >
                      <ForkAwesomeIcon icon={'clock-o'} className='mx-2'/>
                      <span>{ moment(revision.timestamp * 1000).format('LLLL') }</span>
                      <br/>
                      <ForkAwesomeIcon icon={'file-text-o'} className='mx-2'/>
                      <span><Trans i18nKey={'editor.modal.revision.length'}/>: { revision.length }</span>
                      <br/>
                      <ForkAwesomeIcon icon={'user-o'} className={'mx-2'}/>
                      <span>
                        {
                          revisionAuthorListMap.current.get(revision.timestamp)?.map((user, index) => {
                            return (
                              <UserAvatar name={user.name} photo={user.photo} showName={false} additionalClasses={'mx-1'}/>
                            )
                          })
                        }
                      </span>
                    </ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          </Col>
          <Col lg={8} className={'scroll-col'}>
            <ShowIf condition={error}>
              <Alert variant='danger'>
                <Trans i18nKey='editor.modal.revision.error'/>
              </Alert>
            </ShowIf>
            <ShowIf condition={!error && !!selectedRevision}>
              <ReactDiffViewer
                oldValue={selectedRevision?.content}
                newValue={noteContent}
                splitView={false}
                compareMethod={DiffMethod.WORDS}
                useDarkTheme={false}
              />
            </ShowIf>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={onHide}>
          <Trans i18nKey={'common.close'}/>
        </Button>
        <Button
          variant='danger'
          disabled={!selectedRevisionTimestamp}
          onClick={() => window.alert('Not yet implemented. Requires websocket.')}>
          <Trans i18nKey={'editor.modal.revision.revertButton'}/>
        </Button>
        <Button
          variant='primary'
          disabled={!selectedRevisionTimestamp}
          onClick={() => downloadRevision(id, selectedRevision)}>
          <Trans i18nKey={'editor.modal.revision.download'}/>
        </Button>
      </Modal.Footer>
    </CommonModal>
  )
}
