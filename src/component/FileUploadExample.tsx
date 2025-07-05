import React from 'react';
import { FileUpload } from './common/FileUpload';
import { SimpleFileUpload } from './common/SimpleFileUpload';
import { Card } from 'primereact/card';

export const FileUploadExample: React.FC = () => {
  const handleUpload = async (files: File[]) => {
    // Simulate API upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Files uploaded:', files);
  };

  const handleValidationFail = (error: string) => {
    console.error('Validation failed:', error);
  };

  const customValidation = (file: File): boolean | string => {
    // Example: Only allow image files
    if (!file.type.startsWith('image/')) {
      return 'Only image files are allowed';
    }
    return true;
  };

  return (
    <div className="p-4">
      <Card title="File Upload Demo" className="mb-4">
        <h3>Basic Upload</h3>
        <FileUpload
          onUpload={handleUpload}
          onValidationFail={handleValidationFail}
        />
      </Card>

      <Card title="Image Upload with Validation" className="mb-4">
        <h3>Image Upload Only</h3>
        <FileUpload
          accept="image/*"
          maxFileSize={5 * 1024 * 1024} // 5MB
          maxFiles={3}
          onUpload={handleUpload}
          onValidationFail={handleValidationFail}
          customValidation={customValidation}
        />
      </Card>

      <Card title="Single File Upload" className="mb-4">
        <h3>Single File Only</h3>
        <FileUpload
          multiple={false}
          maxFileSize={2 * 1024 * 1024} // 2MB
          onUpload={handleUpload}
          onValidationFail={handleValidationFail}
        />
      </Card>

      <Card title="Simple File Upload" className="mb-4">
        <h3>Simple Input Style</h3>
        <SimpleFileUpload
          accept="image/*"
          maxFileSize={5 * 1024 * 1024} // 5MB
          onUpload={handleUpload}
          onValidationFail={handleValidationFail}
          buttonLabel="Browse"
          style={{ maxWidth: '500px' }}
        />

        <div className="mt-4">
          <h3>Single File Simple Upload</h3>
          <SimpleFileUpload
            multiple={false}
            maxFileSize={2 * 1024 * 1024} // 2MB
            onUpload={handleUpload}
            onValidationFail={handleValidationFail}
            buttonLabel="Select File"
            style={{ maxWidth: '500px' }}
          />
        </div>
      </Card>
    </div>
  );
};