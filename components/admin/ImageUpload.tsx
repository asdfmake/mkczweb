"use client";

import { useRef } from "react";
import Image from "next/image";

interface ExistingImage {
  id: number;
  filename: string;
}

interface ImageUploadProps {
  existingImages?: ExistingImage[];
  newFiles: File[];
  deletedImageIds: number[];
  onFilesAdd: (files: File[]) => void;
  onFileRemove: (index: number) => void;
  onExistingImageDelete: (id: number) => void;
  onExistingImageRestore: (id: number) => void;
}

export default function ImageUpload({
  existingImages = [],
  newFiles,
  deletedImageIds,
  onFilesAdd,
  onFileRemove,
  onExistingImageDelete,
  onExistingImageRestore,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Validate file sizes
      const validFiles = files.filter((file) => {
        if (file.size === 0) {
          console.warn(`[ImageUpload] Skipping empty file: ${file.name}`);
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          console.warn(`[ImageUpload] File too large (>10MB): ${file.name}`);
          return false;
        }
        return true;
      });
      if (validFiles.length > 0) {
        console.log(`[ImageUpload] Adding ${validFiles.length} valid image files`);
        onFilesAdd(validFiles);
      }
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium text-neutral-700">Images</label>

      {/* Existing images */}
      {existingImages.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-neutral-500">Current images</p>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((img) => {
              const isDeleted = deletedImageIds.includes(img.id);
              return (
                <div
                  key={img.id}
                  className={`relative group rounded-lg overflow-hidden border ${
                    isDeleted
                      ? "border-red-300 opacity-50"
                      : "border-neutral-200"
                  }`}
                >
                  <Image
                    src={`/uploads/${img.filename}`}
                    alt="Article image"
                    width={120}
                    height={80}
                    unoptimized
                    className="w-[120px] h-[80px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      isDeleted
                        ? onExistingImageRestore(img.id)
                        : onExistingImageDelete(img.id)
                    }
                    className={`absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium`}
                  >
                    {isDeleted ? "Restore" : "Remove"}
                  </button>
                  {isDeleted && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-0.5 bg-red-500 rotate-45 absolute" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New files preview */}
      {newFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-neutral-500">New images to upload</p>
          <div className="flex flex-wrap gap-3">
            {newFiles.map((file, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden border border-green-200"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="New upload preview"
                  width={120}
                  height={80}
                  className="w-[120px] h-[80px] object-cover"
                />
                <button
                  type="button"
                  onClick={() => onFileRemove(index)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          Add Images
        </button>
      </div>
    </div>
  );
}
