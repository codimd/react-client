import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { doUserDeletion } from '../../../../../api/user'
import { clearUser } from '../../../../../redux/user/methods'
import { getBackendUrl } from '../../../../../utils/apiUtils'

export const ProfileAdvancedOptions: React.FC = () => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletionButtonText, setDeletionButtonText] = useState('')
  const [deletionButtonActive, setDeletionButtonActive] = useState(false)

  const handleModalClose = () => {
    setShowDeleteModal(false)
  }

  const doCountdown = (value: number) => {
    if (value === 0) {
      setDeletionButtonText(t('deleteUser'))
      setDeletionButtonActive(true)
    } else {
      setDeletionButtonText(value.toString())
      setTimeout(() => doCountdown(value - 1), 1000)
    }
  }

  const handleModalOpen = () => {
    setShowDeleteModal(true)
    setDeletionButtonActive(false)
    doCountdown(10)
  }

  const deleteUserAccount = async () => {
    await doUserDeletion()
    clearUser()
  }

  return (
    <Fragment>
      <Card className="bg-dark mb-4">
        <Card.Body>
          <Card.Title><Trans i18nKey="advancedAccountOptions"/></Card.Title>
          <Button variant="secondary" block href={getBackendUrl() + '/me/export'} className="mb-2">
            <FontAwesomeIcon icon="cloud-download-alt" fixedWidth={true} className="mr-2" />
            <Trans i18nKey="exportAccountData"/>
          </Button>
          <Button variant="danger" block onClick={handleModalOpen}>
            <FontAwesomeIcon icon="trash" fixedWidth={true} className="mr-2" />
            <Trans i18nKey="deleteAccount"/>
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={handleModalClose} animation={true}>
        <Modal.Body className="text-dark">
          <h3><Trans i18nKey="deleteUserAccountQuestion"/></h3>
          <Trans i18nKey="deleteUserAccountInfo"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            <Trans i18nKey="close"/>
          </Button>
          <Button variant="danger" onClick={deleteUserAccount} disabled={!deletionButtonActive}>
            {deletionButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
