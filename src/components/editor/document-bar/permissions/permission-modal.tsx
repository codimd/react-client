import React, { useEffect, useState } from 'react'
import { Alert, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { getUserById } from '../../../../api/users'
import { CommonModal } from '../../../common/modals/common-modal'
import { ShowIf } from '../../../common/show-if/show-if'
import { UserAvatar, UserAvatarProps } from '../../../common/user-avatar/user-avatar'
import { GroupMode, PermissionGroupEntry } from './permission-group-entry'
import { PermissionList } from './permission-list'

export interface PermissionsModalProps {
  show: boolean,
  onChangeShow: (newShow: boolean) => void
}

export interface Principal {
  id: string
  name: string
  photo: string
  canEdit: boolean
}

interface NotePermissions {
  owner: string
  sharedTo: {
    username: string
    canEdit: boolean
  }[],
  sharedToGroup: {
    id: string
    canEdit: boolean
  }[]
}

const permissionsApiResponse: NotePermissions = {
  owner: 'dermolly',
  sharedTo: [{
    username: 'emcrx',
    canEdit: true
  }, {
    username: 'mrdrogdrog',
    canEdit: false
  }],
  sharedToGroup: [{
    id: '1',
    canEdit: true
  }, {
    id: '2',
    canEdit: false
  }]
}

export const PermissionModal: React.FC<PermissionsModalProps> = ({ show, onChangeShow }) => {
  useTranslation()
  const [error, setError] = useState(false)
  const [userList, setUserList] = useState<Principal[]>([])
  const [owner, setOwner] = useState<UserAvatarProps>()
  const [allPermissions, setAllPermissions] = useState(GroupMode.NONE)
  const [loggedPermissions, setLoggedPermissions] = useState(GroupMode.NONE)

  useEffect(() => {
    // set owner
    getUserById(permissionsApiResponse.owner).then(response => {
      setOwner({
        name: response.name,
        photo: response.photo
      })
    }).catch(() => setError(true))
    // set user List
    permissionsApiResponse.sharedTo.forEach(shareUser => {
      getUserById(shareUser.username).then(response => {
        setUserList(list => list.concat([{
          id: response.id,
          name: response.name,
          photo: response.photo,
          canEdit: shareUser.canEdit
        }]))
      }).catch(() => setError(true))
    })
    // set group List
    permissionsApiResponse.sharedToGroup.forEach(sharedGroup => {
      if (sharedGroup.id === '1') {
        console.log('found everyone')
        setAllPermissions(sharedGroup.canEdit ? GroupMode.EDIT : GroupMode.VIEW)
      } else if (sharedGroup.id === '2') {
        console.log('found everyone logged in')
        setLoggedPermissions(sharedGroup.canEdit ? GroupMode.EDIT : GroupMode.VIEW)
      }
    })
  }, [])

  const changeUserMode = (userId: Principal['id'], canEdit: Principal['canEdit']) => {
    setUserList(list =>
      list
        .map(user => {
          if (user.id === userId) {
            user.canEdit = canEdit
          }
          return user
        }))
  }

  const removeUser = (userId: Principal['id']) => {
    setUserList(list => list.filter(user => user.id !== userId))
  }

  const addUser = (name: Principal['name']) => {
    setUserList(list => list.concat({
      id: name,
      photo: '/avatar.png',
      name: name,
      canEdit: false
    }))
  }

  return (
    <CommonModal
      show={show}
      onHide={() => onChangeShow(false)}
      closeButton={true}
      titleI18nKey={'editor.modal.permissions.title'}>
      <Modal.Body>
        <h5 className={'mb-3'}><Trans i18nKey={'editor.modal.permissions.owner'}/></h5>
        <ShowIf condition={error}>
          <Alert variant='danger'>
            <Trans i18nKey='editor.modal.permissions.error'/>
          </Alert>
        </ShowIf>
        <ul className={'list-group'}>
          <li className={'list-group-item d-flex flex-row align-items-center'}>
            <UserAvatar name={owner?.name ?? ''} photo={owner?.photo ?? ''}/>
          </li>
        </ul>
        <h5 className={'my-3'}><Trans i18nKey={'editor.modal.permissions.sharedWithUsers'}/></h5>
        <PermissionList
          list={userList}
          identifier={entry => (<UserAvatar name={entry.name} photo={entry.photo}/>)}
          changeEditMode={changeUserMode}
          removeEntry={removeUser}
          createEntry={addUser}
          editI18nKey={'editor.modal.permissions.editUser'}
          viewI18nKey={'editor.modal.permissions.viewOnlyUser'}
          removeI18nKey={'editor.modal.permissions.removeUser'}
          addI18nKey={'editor.modal.permissions.addUser'}
        />
        <h5 className={'my-3'}><Trans i18nKey={'editor.modal.permissions.sharedWithGroups'}/></h5>
        <ul className={'list-group'}>
          <PermissionGroupEntry
            title={'editor.modal.permissions.allUser'}
            editMode={allPermissions}
            onChangeEditMode={setAllPermissions}
          />
          <PermissionGroupEntry
            title={'editor.modal.permissions.allLoggedInUser'}
            editMode={loggedPermissions}
            onChangeEditMode={setLoggedPermissions}
          />
        </ul>
      </Modal.Body>
    </CommonModal>
  )
}
