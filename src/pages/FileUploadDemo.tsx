import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import { FileUpload } from '../component/common/FileUpload';
import { SimpleFileUpload } from '../component/common/SimpleFileUpload';

export default function FileUploadDemo() {
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
      <div className="flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="m-0">File Upload Components</h1>
          <p className="text-500 mb-0">Flexible and reusable file upload components with various styles and validations</p>
        </div>
      </div>

      <TabView>
        <TabPanel header="Modern Upload" leftIcon="pi pi-upload mr-2">
          <Card className="mb-4">
            <div className="mb-4">
              <h2>Drag & Drop Upload</h2>
              <p className="text-500">Modern file uploader with drag & drop support, progress bar, and preview capabilities</p>
            </div>
            <FileUpload
              onUpload={handleUpload}
              onValidationFail={handleValidationFail}
            />
          </Card>

          <Card className="mb-4">
            <div className="mb-4">
              <h2>Image Upload with Validation</h2>
              <p className="text-500">Restricted to image files with custom validation and size limits</p>
            </div>
            <FileUpload
              accept="image/*"
              maxFileSize={5 * 1024 * 1024} // 5MB
              maxFiles={3}
              onUpload={handleUpload}
              onValidationFail={handleValidationFail}
              customValidation={customValidation}
            />
          </Card>
        </TabPanel>

        <TabPanel header="Simple Upload" leftIcon="pi pi-file mr-2">
          <Card className="mb-4">
            <div className="mb-4">
              <h2>Basic File Input</h2>
              <p className="text-500">Traditional file input style with modern aesthetics</p>
            </div>
            <SimpleFileUpload
              onUpload={handleUpload}
              onValidationFail={handleValidationFail}
              style={{ maxWidth: '500px' }}
            />
          </Card>

          <Card className="mb-4">
            <div className="mb-4">
              <h2>Image Upload</h2>
              <p className="text-500">Simple image uploader with size restrictions</p>
            </div>
            <SimpleFileUpload
              accept="image/*"
              maxFileSize={5 * 1024 * 1024} // 5MB
              onUpload={handleUpload}
              onValidationFail={handleValidationFail}
              buttonLabel="Choose Image"
              style={{ maxWidth: '500px' }}
            />
          </Card>

          <Card>
            <div className="mb-4">
              <h2>Single File Upload</h2>
              <p className="text-500">Restricted to single file selection</p>
            </div>
            <SimpleFileUpload
              multiple={false}
              maxFileSize={2 * 1024 * 1024} // 2MB
              onUpload={handleUpload}
              onValidationFail={handleValidationFail}
              buttonLabel="Select File"
              style={{ maxWidth: '500px' }}
            />
          </Card>
        </TabPanel>

        <TabPanel header="Documentation" leftIcon="pi pi-book mr-2">
          <Card>
            <h2>Component Properties</h2>
            <Divider />
            
            <h3>Common Props</h3>
            <ul className="list-none p-0 m-0">
              <li className="mb-3">
                <code className="font-bold">maxFileSize</code>
                <p>Maximum file size in bytes. Default: 10MB</p>
              </li>
              <li className="mb-3">
                <code className="font-bold">accept</code>
                <p>Accepted file types. Example: "image/*", ".pdf,.doc"</p>
              </li>
              <li className="mb-3">
                <code className="font-bold">multiple</code>
                <p>Allow multiple file selection. Default: true</p>
              </li>
              <li className="mb-3">
                <code className="font-bold">maxFiles</code>
                <p>Maximum number of files allowed. Default: 5</p>
              </li>
              <li className="mb-3">
                <code className="font-bold">onUpload</code>
                <p>Callback function when files are uploaded</p>
              </li>
              <li className="mb-3">
                <code className="font-bold">onValidationFail</code>
                <p>Callback function when validation fails</p>
              </li>
              <li className="mb-3">
                <code className="font-bold">customValidation</code>
                <p>Custom validation function</p>
              </li>
            </ul>

            <h3>Usage Example</h3>
            <pre className="p-3 surface-ground border-round">
              {`<FileUpload
  accept="image/*"
  maxFileSize={5 * 1024 * 1024}
  maxFiles={3}
  onUpload={(files) => handleUpload(files)}
  onValidationFail={(error) => console.error(error)}
/>`}
            </pre>
          </Card>
        </TabPanel>
      </TabView>
    </div>
  );
}