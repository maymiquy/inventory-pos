import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';

export function DropzoneFile() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5 lg:max-w-sm xl:max-w-md">
      <Label htmlFor="picture" />
      <div
        className={`relative h-[270px] rounded-lg border-2 border-dashed transition-all duration-200 ease-in-out ${
          isDragging
            ? 'scale-102 border-primary bg-primary/10'
            : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
        } flex cursor-pointer items-center justify-center overflow-hidden`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover transition-transform hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <p className="text-sm text-white">
                Click to change image
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-gray-400">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drag and drop your image here
              </p>
              <p className="mt-1 text-xs text-gray-500">
                or click to select from your computer
              </p>
            </div>
          </div>
        )}
        <Input
          id="picture"
          type="file"
          className="sr-only"
          onChange={(e) =>
            e.target.files && handleFile(e.target.files[0])
          }
          ref={inputRef}
          accept="image/*"
        />
      </div>
      {file && (
        <p className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {file.name}
        </p>
      )}
    </div>
  );
}
