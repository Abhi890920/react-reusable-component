import React, { useState, useRef } from 'react';
import { FileUpload as PrimeFileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';

export interface FileUploadProps {
  maxFileSize?: number; // in bytes
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  onUpload?: (files: File[]) => Promise<void>;
  onValidationFail?: (error: string) => void;
  customValidation?: (file: File) => boolean | string;
}

const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_MAX_FILES = 5;

export const FileUpload: React.FC<FileUploadProps> = ({
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  accept = '*/*',
  multiple = true,
  maxFiles = DEFAULT_MAX_FILES,
  onUpload,
  onValidationFail,
  customValidation,
}) => {
  const [totalSize, setTotalSize] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const toast = useRef<Toast>(null);
  const fileUploadRef = useRef<PrimeFileUpload>(null);

  const validateFile = (file: File): boolean => {
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

  const onTemplateSelect = (e: { files: File[] }) => {
    const files = e.files;
    if (!multiple && files.length > 1) {
      showError('Multiple file upload is not allowed');
      return;
    }

    if (files.length > maxFiles) {
      showError(`Maximum ${maxFiles} files are allowed`);
      return;
    }

    const validFiles = files.filter(validateFile);
    if (validFiles.length === files.length) {
      const newTotalSize = validFiles.reduce((sum, file) => sum + file.size, 0);
      setTotalSize(newTotalSize);
    }
  };

  const onTemplateUpload = async (e: { files: File[] }) => {
    try {
      if (onUpload) {
        await onUpload(e.files);
      }
      showSuccess('Files uploaded successfully');
      setTotalSize(0);
      setUploadProgress(0);
    } catch (error) {
      showError('Upload failed: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const onTemplateRemove = (file: File) => {
    setTotalSize(prev => prev - file.size);
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: any) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / maxFileSize * 100;
    const formattedValue = fileUploadRef.current?.formatSize(totalSize);

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formattedValue} / {fileUploadRef.current?.formatSize(maxFileSize)}</span>
          <ProgressBar value={value} style={{ width: '200px', height: '12px' }} />
        </div>
      </div>
    );
  };

  const itemTemplate = (file: File, props: any) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <img alt={file.name} role="presentation" src={file instanceof File ? URL.createObjectURL(file) : ''} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={fileUploadRef.current?.formatSize(file.size)} severity="warning" className="px-3 py-2" />
        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => props.onRemove()} />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i className="pi pi-cloud-upload" style={{ fontSize: '5em', color: 'var(--surface-500)' }} />
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Drag and Drop Files Here
        </span>
      </div>
    );
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <PrimeFileUpload
        ref={fileUploadRef}
        name="files[]"
        multiple={multiple}
        accept={accept}
        maxFileSize={maxFileSize}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        onRemove={onTemplateRemove}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseLabel="Select Files"
        uploadLabel="Upload"
        cancelLabel="Cancel"
        className="p-fileupload-modern"
      />
    </div>
  );
};