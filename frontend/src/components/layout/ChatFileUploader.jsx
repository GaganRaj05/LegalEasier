import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

export default function FileUploader({ onFilesSelected }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag & drop files here, or click to select files</p>
      )}
    </div>
  );
}
