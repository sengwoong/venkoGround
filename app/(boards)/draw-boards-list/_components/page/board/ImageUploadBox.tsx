import { useState, useRef, useEffect } from 'react';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageUploadBoxProps {
  max?: number;
  previewImages: JSX.Element[];
  setPreviewImages:React.Dispatch<React.SetStateAction<JSX.Element[]>>
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ max = 10,previewImages,setPreviewImages }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const uploadBoxRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const uploadBox = uploadBoxRef.current;
    const input = inputRef.current;

    const handleFiles = (files: FileList) => {
        const newImages: string[] = []; // 새로운 이미지 배열을 만듭니다.
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!file.type.startsWith('image/')) continue;
          const reader = new FileReader();
          reader.onloadend = (e) => {
            const result = e.target?.result as string;
            if (result) {
              newImages.push(result); // 새 이미지를 배열에 추가합니다.
            }
            if (i === files.length - 1) { // 마지막 파일이 로드되면
              setUploadedImages(newImages.slice(0, max)); // 업로드된 이미지 배열을 새로운 이미지 배열로 대체합니다.
            }
          };
          reader.readAsDataURL(file);
        }
      };
      

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement> | Event) => {
        const files = (event as React.ChangeEvent<HTMLInputElement>).target.files;
        if (files) handleFiles(files);
      };
      
    const dropHandler = (event: React.DragEvent<HTMLLabelElement> | DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const files = (event as DragEvent)?.dataTransfer?.files;
        if (files) handleFiles(files);
      };
      
      const dragOverHandler = (event: React.DragEvent<HTMLLabelElement> | DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };
      

    uploadBox?.addEventListener('drop', dropHandler);
    uploadBox?.addEventListener('dragover', dragOverHandler);
    input?.addEventListener('change', changeHandler);

    return () => {
      uploadBox?.removeEventListener('drop', dropHandler);
      uploadBox?.removeEventListener('dragover', dragOverHandler);
      input?.removeEventListener('change', changeHandler);
    };
  }, [max]);

  useEffect(() => {
    const imageJSXs = uploadedImages.map((image, index) => {
      const deleteFunc = () => {
        setUploadedImages((prevImages) => {
          const newImages = [...prevImages];
          newImages.splice(index, 1);
          return newImages;
        });
      };
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-20 h-20  "
        >
          <img src={image} alt="preview" className="w-full  rounded-full h-full object-cover" />
          <button
          className="absolute top-1 right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center"
          onClick={deleteFunc}
          >
            <X className="w-4 h-4 text-white" />
          </button>

        </motion.div>
      );
    });
    setPreviewImages(imageJSXs);
  }, [uploadedImages]);

  return (
    <div className="flex flex-col items-center">
      <label
        className="flex flex-col items-center justify-center w-80 h-40 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300"
        htmlFor="fileInput"
        ref={uploadBoxRef}
      >
         <div className="flex items-center justify-center border border-gray-300">
        {previewImages}
        </div>

        <div className="text-center">
          <h3>드래그 또는 클릭하여 업로드</h3>
          <span className="text-xs text-gray-600">권장사항: 30MB 이하 고화질</span>
        </div>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          multiple
          accept="image/*"
          ref={inputRef}
        />
      </label>
    
    </div>
  );
};

export default ImageUploadBox;
