// /*eslint-disable  */
// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import ImageEditor from '@toast-ui/react-image-editor';
// import { Button } from '@/components/ui/button';
// import { Crop, X } from 'lucide-react';
// import { toast } from 'sonner';

// import 'tui-image-editor/dist/tui-image-editor.css';
// import 'tui-color-picker/dist/tui-color-picker.css';

// interface ImageEditorModalProps {
//   imageSrc: string;
//   onApply: (editedFile: File, previewUrl: string) => void;
//   onCancel: () => void;
// }

// export default function ImageEditorModal({ imageSrc, onApply, onCancel }: ImageEditorModalProps) {
//   const editorRef = useRef<any>(null);
//   const [isMounted, setIsMounted] = useState(false);

//   // Prevent SSR flash + ensure editor mounts only on client
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const applyEdit = async () => {
//     if (!editorRef.current) return;

//     try {
//       const editorInstance = editorRef.current.getInstance();
//       const dataUrl = editorInstance.toDataURL();

//       const blob = await fetch(dataUrl).then(res => res.blob());
//       const editedFile = new File([blob], "edited-image.jpg", { type: blob.type || "image/jpeg" });

//       onApply(editedFile, dataUrl);
//       toast.success("Image edited successfully!");
//     } catch (err) {
//       toast.error("Failed to apply edits" + err);
//     }
//   };

//   // Show nothing during SSR
//   if (!isMounted) {
//     return (
//       <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
//         <div className="text-white text-xl">Loading Editor...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
//       <div className="flex-1 relative overflow-hidden">
//         <ImageEditor
//           ref={editorRef}
//           includeUI={{
//             loadImage: {
//               path: imageSrc,
//               name: 'Edit Image',
//             },
//             menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
//             initMenu: 'filter',
//             uiSize: { width: '100%', height: '100%' },
//             menuBarPosition: 'bottom',
//           }}
//           cssMaxHeight={window.innerHeight - 140}
//           cssMaxWidth={window.innerWidth - 40}
//           selectionStyle={{ cornerSize: 20, rotatingPointOffset: 70 }}
//           usageStatistics={false}
//         />
//       </div>

//       <div className="p-4 bg-[#2A2A2A] flex justify-between gap-4 border-t border-gray-700">
//         <Button
//           variant="outline"
//           onClick={onCancel}
//           className="h-12 rounded-[8px] border-[#FF6900] text-white hover:bg-[#FF6900]/10"
//         >
//           <X className="mr-2 h-5 w-5" />
//           Cancel
//         </Button>
//         <Button
//           onClick={applyEdit}
//           className="bg-[#FF6900] hover:bg-[#e85e00] h-12 rounded-[8px]"
//         >
//           <Crop className="mr-2 h-5 w-5" />
//           Apply Changes
//         </Button>
//       </div>
//     </div>
//   );
// }

/* eslint-disable */
'use client';

import { useRef, useEffect, useState } from 'react';
import ImageEditor from '@toast-ui/react-image-editor';
import { Button } from '@/components/ui/button';
import { Crop, X } from 'lucide-react';
import { toast } from 'sonner';

import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

interface ImageEditorModalProps {
  imageSrc: string;
  onApply: (editedFile: File, previewUrl: string) => void;
  onCancel: () => void;
}

export default function ImageEditorModal({ imageSrc, onApply, onCancel }: ImageEditorModalProps) {
  const editorRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Client-only mount
  useEffect(() => {
    setIsMounted(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const applyEdit = async () => {
    if (!editorRef.current) return;

    try {
      const editorInstance = editorRef.current.getInstance();
      const dataUrl = editorInstance.toDataURL();
      const blob = await fetch(dataUrl).then(res => res.blob());
      const editedFile = new File([blob], "edited-image.jpg", { type: blob.type || "image/jpeg" });

      onApply(editedFile, dataUrl);
      toast.success("Image edited successfully!");
    } catch (err) {
      toast.error("Failed to apply edits" + err);
    }
  };

  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="text-white text-xl">Loading Editor...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <ImageEditor
          ref={editorRef}
          includeUI={{
            loadImage: { path: imageSrc, name: 'Edit Image' },
            menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
            initMenu: 'filter',
            uiSize: { width: '100%', height: '100%' },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={dimensions.height - 140}
          cssMaxWidth={dimensions.width - 40}
          selectionStyle={{ cornerSize: 20, rotatingPointOffset: 70 }}
          usageStatistics={false}
        />
      </div>

      <div className="p-4 bg-[#2A2A2A] flex justify-between gap-4 border-t border-gray-700">
        <Button
          variant="outline"
          onClick={onCancel}
          className="h-12 rounded-[8px] border-[#FF6900] text-white hover:bg-[#FF6900]/10"
        >
          <X className="mr-2 h-5 w-5" />
          Cancel
        </Button>
        <Button
          onClick={applyEdit}
          className="bg-[#FF6900] hover:bg-[#e85e00] h-12 rounded-[8px]"
        >
          <Crop className="mr-2 h-5 w-5" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
