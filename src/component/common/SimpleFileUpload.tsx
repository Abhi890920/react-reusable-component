import React, { useRef, ChangeEvent, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

export interface SimpleFileUploadProps {
  maxFileSize?: number; // in bytes
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  onUpload?: (files: File[]) => Promise<void>;
  onValidationFail?: (error: string) => void;
  customValidation?: (file: File) => boolean | string;
  className?: string;
  style?: React.CSSProperties;
  buttonLabel?: string;
}

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_MAX_FILES = 5;

export const SimpleFileUpload: React.FC<SimpleFileUploadProps> = ({
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  accept = '*/*',
  multiple = true,
  maxFiles = DEFAULT_MAX_FILES,
  onUpload,
  onValidationFail,
  customValidation,
  className = '',
  style,
  buttonLabel = 'Choose Files',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useRef<Toast>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const validateFiles = (files: FileList): File[] => {
    const fileArray = Array.from(files);
    
    if (!multiple && fileArray.length > 1) {
      showError('Multiple file upload is not allowed');
      return [];
    }

    if (fileArray.length > maxFiles) {
      showError(`Maximum ${maxFiles} files are allowed`);
      return [];
    }

    return fileArray.filter(file => {
      if (file.size > maxFileSize) {
        const error = `File ${file.name} exceeds maximum size of ${maxFileSize / (1024 * 1024)}MB`;
        onValidationFail?.(error);
        showError(error);
        return false;
      }

      if (customValidation) {
        const result = customValidation(file);
        if (typeof result === 'string') {
          onValidationFail?.(result);
          showError(result);
          return false;
        }
        return result;
      }

      return true;
    });
  };

  const showError = (detail: string) => {
    toast.current?.show({
      severity: 'error',
      summary: 'Error',
      detail,
      life: 3000,
    });
  };

  const showSuccess = (detail: string) => {
    toast.current?.show({
      severity: 'success',
      summary: 'Success',
      detail,
      life: 3000,
    });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = validateFiles(files);
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      try {
        if (onUpload) {
          await onUpload(validFiles);
          showSuccess('Files uploaded successfully');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setSelectedFiles([]);
        }
      } catch (error) {
        showError('Upload failed: ' + (error instanceof Error ? error.message : String(error)));
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={"simple-file-upload " + className} style={{maxWidth: 500, ...style}}>
      <Toast ref={toast} />
      <div className="p-inputgroup mb-3 border-round shadow-1" style={{overflow: 'hidden', background: 'var(--surface-card)'}}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <InputText
          value={selectedFiles.length > 0 ? `${selectedFiles.length} file(s) selected` : ''}
          readOnly
          placeholder="No file chosen"
          className="w-full border-none bg-transparent"
          style={{background: 'transparent'}}
        />
        <Button
          type="button"
          icon="pi pi-upload"
          onClick={handleButtonClick}
          label={buttonLabel}
          severity="primary"
          raised
          className="border-none border-left-1 border-200"
          style={{borderRadius: 0, minWidth: 130}}
        />
      </div>
      {selectedFiles.length > 0 && (
        <div className="flex flex-column gap-2 mt-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex align-items-center gap-3 p-3 surface-100 border-round shadow-1 transition-all hover:shadow-3">
              <i className="pi pi-file text-2xl text-primary" />
              <div className="flex-grow-1">
                <div className="font-semibold text-900">{file.name}</div>
                <div className="text-500 text-xs">{formatFileSize(file.size)}</div>
              </div>
              <Tag severity="info" value={file.type.split('/')[1]?.toUpperCase() || 'FILE'} className="px-3 py-1 text-xs border-round-xl" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};