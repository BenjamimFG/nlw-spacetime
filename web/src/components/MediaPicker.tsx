// This file will only use <img> to show local images, so theres no need for next's <Image>
/* eslint-disable @next/next/no-img-element */
'use client'

import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) return

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onMediaSelected}
        type="file"
        name="media"
        id="media"
        className="invisible h-0 w-0"
        accept="image/*"
      />
      {preview && (
        <img
          src={preview}
          alt="Uploaded media preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
