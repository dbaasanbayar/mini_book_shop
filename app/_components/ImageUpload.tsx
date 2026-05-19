'use client'

import { useState } from 'react'

export default function ImageUpload({
  onUpload,
  label = 'BOOK PHOTO *',
}: {
  onUpload: (url: string) => void
  label?: string
}) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setPreview(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    onUpload(data.url)
    setLoading(false)
  }

  return (
    <div>
      <label className="font-mono text-sm text-ink block mb-1">
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="w-full border-4 border-ink px-3 py-2 font-mono bg-cream shadow-brutal focus:outline-none"
      />
      {loading && (
        <p className="font-mono text-sm text-ink mt-2">Uploading...</p>
      )}
      {preview && !loading && (
        <img
          src={preview}
          className="mt-3 h-40 object-cover border-4 border-ink shadow-brutal"
        />
      )}
    </div>
  )
}