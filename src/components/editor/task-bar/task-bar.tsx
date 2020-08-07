import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../../redux'
import { Branding } from '../../common/branding/branding'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { SignInButton } from '../../landing/layout/navigation/sign-in-button'
import { UserDropdown } from '../../landing/layout/navigation/user-dropdown/user-dropdown'
import { EditorPathParams } from '../editor'
import { DarkModeButton } from './dark-mode-button'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button'

export const TaskBar: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams<EditorPathParams>()
  const user = useSelector((state: ApplicationState) => state.user)

  return (
    <Navbar bg={'light'}>
      <Nav className="mr-auto d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/intro" className="text-secondary text-decoration-none d-flex align-items-center">
            <ForkAwesomeIcon icon="file-text" className={'mr-2'}/>
            <span>CodiMD</span>
            <Branding inline={true}/>
          </Link>
        </Navbar.Brand>
        <EditorViewMode/>
        <DarkModeButton/>
        <Link to={`/p/${id}`} target='_blank'>
          <Button title={t('editor.menu.slideMode')} className="ml-2 text-secondary" size="sm" variant="outline-light">
            <ForkAwesomeIcon icon="television"/>
          </Button>
        </Link>
        <HelpButton/>
      </Nav>
      <Nav className="d-flex align-items-center text-secondary">
        <Button className="mx-2" size="sm" variant="primary">
          <ForkAwesomeIcon icon="plus"/> <Trans i18nKey="editor.menu.new"/>
        </Button>
        <ShowIf condition={!user}>
          <SignInButton size={'sm'} />
        </ShowIf>
        <ShowIf condition={!!user}>
          <UserDropdown />
        </ShowIf>
      </Nav>
    </Navbar>
  )
}
