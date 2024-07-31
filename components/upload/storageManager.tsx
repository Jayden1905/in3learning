'use client'

import { StorageManager } from '@aws-amplify/ui-react-storage'
import '@aws-amplify/ui-react/styles.css'

export const DefaultStorageManager = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path='media/amplify-d3axi4006097a7-main-br-mediabucket9f5de49b-xdigzq3qi6io/'
      maxFileCount={1}
      isResumable
      onUploadError={(error) => console.log('Error uploading file', error)}
    />
  )
}
