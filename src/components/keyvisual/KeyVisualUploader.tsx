import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { bayerSansClasses } from '../../lib/bayer-sans';

interface KeyVisualUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
}

export const KeyVisualUploader = ({
  onUpload,
  maxFiles = 5,
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/psd'],
}: KeyVisualUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit to max files
    const newFiles = acceptedFiles.slice(0, maxFiles - files.length);
    
    // Create previews
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    
    setFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    
    // Call the onUpload callback
    onUpload(newFiles);
  }, [files, maxFiles, onUpload]);

  const removeFile = (index: number) => {
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/psd': [],
    },
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}
          ${files.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          transition-colors duration-200 ease-in-out
          flex flex-col items-center justify-center text-center
        `}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mb-3" />
        <p className={`${bayerSansClasses.body.base} text-gray-700`}>
          {isDragActive
            ? 'Drop the files here...'
            : files.length >= maxFiles
            ? 'Maximum number of files reached'
            : 'Drag & drop key visual files here, or click to select files'}
        </p>
        <p className={`${bayerSansClasses.body.small} text-gray-500 mt-2`}>
          Accepted formats: JPG, PNG, PSD (max {maxFiles} files)
        </p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
                {preview.endsWith('.psd') ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">PSD File</p>
                  </div>
                ) : (
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="object-contain w-full h-full"
                  />
                )}
              </div>
              <div className="p-3 flex justify-between items-center">
                <div className="truncate">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {files[index].name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(files[index].size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  icon={<X size={16} />}
                  aria-label="Remove file"
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
