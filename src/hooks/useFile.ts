import { Ref, ref } from '@nuxtjs/composition-api'

const useFile = (
  fileRef: Ref<null | File>,
  fileBufferDataRef: Ref<any>,
  deleteFlagRef: Ref<'0' | '1'>
) => {
  const preview = ref<string>('')

  const clear = () => {
    fileRef.value = null
    fileBufferDataRef.value = null
    preview.value = ''
    deleteFlagRef.value = '1'
  }

  const handleFileChange = ({
    e,
    fileInputValue,
  }: {
    e: Blob
    fileInputValue: File
  }) => {
    fileRef.value = fileInputValue
    setFileData(e)
    setPreview(e)
    deleteFlagRef.value = '0'
  }

  const setFileData = (e: Blob) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      fileBufferDataRef.value = ev.target!.result
    }
    reader.readAsArrayBuffer(e)
  }

  const setPreview = (e: Blob) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      if (typeof ev.target!.result === 'string') {
        preview.value = ev.target!.result
      }
    }
    reader.readAsDataURL(e)
  }

  return {
    clear,
    handleFileChange,
    preview,
  }
}

export default useFile
