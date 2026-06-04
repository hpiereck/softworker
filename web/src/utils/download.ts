export async function waitForNextPaint(): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  return new Blob([Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))], { type: mimeType })
}

function getTimestampedDownloadFilename(filename: string): string {
  const date = new Date()
  const extensionIndex = filename.lastIndexOf('.')
  const suffix = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0'),
    String(date.getMilliseconds()).padStart(3, '0'),
  ].join('')

  if (extensionIndex <= 0) {
    return `${filename}-${suffix}`
  }

  const baseName = filename.slice(0, extensionIndex)
  const extension = filename.slice(extensionIndex)

  return `${baseName}-${suffix}${extension}`
}

export function downloadBlob(blob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const downloadFilename = getTimestampedDownloadFilename(filename)

  try {
    link.href = objectUrl
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
  } finally {
    window.setTimeout(() => {
      link.remove()
      URL.revokeObjectURL(objectUrl)
    }, 0)
  }
}
