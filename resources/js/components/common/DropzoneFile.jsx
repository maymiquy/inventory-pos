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
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture" />
      <div
        className={`relative h-[270px] rounded-lg border-2 border-dashed px-4 ${
          isDragging ? 'border-primary' : 'border-gray-300'
        } flex cursor-pointer items-center justify-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Drag and drop your image here, or click to
              select
            </p>
            {!file && (
              <img
                src="https://via.placeholder.com/400x200/?text=Upload+Image"
                alt="Placeholder"
                className="rounde-xl mx-auto mt-4"
              />
            )}
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
        <p className="text-xs text-zinc-400">
          File selected: {file.name}
        </p>
      )}
    </div>
  );
}
