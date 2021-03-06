/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ForkAwesomeIcon } from '../common/fork-awesome/fork-awesome-icon'

export const FeatureLinks: React.FC = () => {
  useTranslation()
  return (
    <Row className='mb-5 d-flex flex-row justify-content-center'>
      <Col md={3}>
        <Link to={'/n/features#Share-Notes'} className='text-light'>
          <ForkAwesomeIcon icon='bolt' size='2x' />
          <h6>
            <Trans i18nKey='landing.intro.features.collaboration' />
          </h6>
        </Link>
      </Col>
      <Col md={3}>
        <Link to={'/n/features#MathJax'} className='text-light'>
          <ForkAwesomeIcon icon='bar-chart' size='2x' />
          <h6>
            <Trans i18nKey='landing.intro.features.katex' />
          </h6>
        </Link>
      </Col>
      <Col md={3}>
        <Link to={'/n/features#Slide-Mode'} className='text-light'>
          <ForkAwesomeIcon icon='television' size='2x' />
          <h6>
            <Trans i18nKey='landing.intro.features.slides' />
          </h6>
        </Link>
      </Col>
    </Row>
  )
}
