/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProxiedUrl } from '../../../../api/media'
import { ApplicationState } from '../../../../redux'
import { LightboxImageFrame } from './lightbox-image-frame'

export const ProxyImageFrame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (
  {
    src,
    title,
    alt,
    ...props
  }) => {
  const [imageUrl, setImageUrl] = useState('')
  const imageProxyEnabled = useSelector((state: ApplicationState) => state.config.useImageProxy)

  useEffect(() => {
    if (!imageProxyEnabled || !src) {
      return
    }
    getProxiedUrl(src)
      .then(proxyResponse => setImageUrl(proxyResponse.src))
      .catch(err => console.error(err))
  }, [imageProxyEnabled, src])

  if (imageProxyEnabled) {
    return (
      <LightboxImageFrame src={imageUrl} title={title ?? alt ?? ''} alt={alt} {...props}/>
    )
  }

  return (
    <LightboxImageFrame src={src ?? ''} title={title ?? alt ?? ''} alt={alt} {...props}/>
  )
}
