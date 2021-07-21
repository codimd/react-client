/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element } from 'domhandler'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { ProxyImageFrame } from './proxy-image-frame'
import { IframeSendingPlaceholderImageFrame } from './iframe-sending-placeholder-image-frame'
import { UploadIndicatingFrame } from './upload-indicating-frame'

export type ImageClickHandler = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void

const uploadIdRegex = /^upload-(.*)$/

/**
 * Detects image tags and either
 * - loads them directly
 * - loads them via image proxy if configured.
 * - Shows an image placeholder frame if the url is "https://"
 * - Shows an upload replacement frame if the url is "uploads-UPLOAD_ID"
 */
export class ImageReplacer extends ComponentReplacer {
  private readonly clickHandler?: ImageClickHandler

  constructor(clickHandler?: ImageClickHandler) {
    super()
    this.clickHandler = clickHandler
  }

  public getReplacement(node: Element): React.ReactElement | undefined {
    if (!(node.name === 'img' && node.attribs)) {
      return
    }
    if (node.attribs.src === 'https://') {
      return (
        <IframeSendingPlaceholderImageFrame
          alt={node.attribs.alt}
          title={node.attribs.title}
          width={node.attribs.width}
          height={node.attribs.height}
        />
      )
    } else if (uploadIdRegex.test(node.attribs.src)) {
      return <UploadIndicatingFrame width={node.attribs.width} height={node.attribs.height} />
    } else {
      return (
        <ProxyImageFrame
          id={node.attribs.id}
          className={`${node.attribs.class} cursor-zoom-in`}
          src={node.attribs.src}
          alt={node.attribs.alt}
          title={node.attribs.title}
          width={node.attribs.width}
          height={node.attribs.height}
          onClick={this.clickHandler}
        />
      )
    }
  }
}
