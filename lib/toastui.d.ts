// src/types/toastui.d.ts

declare module '@toast-ui/react-image-editor' {
  import { Component } from 'react';
  import { ImageEditor as TuiImageEditor } from 'tui-image-editor';

  interface ImageEditorProps {
    includeUI?: {
      loadImage?: {
        path: string;
        name: string;
      };
      theme?: any;
      menu?: string[];
      initMenu?: string;
      uiSize?: {
        width: string;
        height: string;
      };
      menuBarPosition?: 'top' | 'bottom' | 'left' | 'right';
    };
    cssMaxHeight?: number;
    cssMaxWidth?: number;
    selectionStyle?: {
      cornerSize?: number;
      rotatingPointOffset?: number;
    };
    usageStatistics?: boolean;
  }

  class ImageEditor extends Component<ImageEditorProps> {
    getInstance(): TuiImageEditor;
  }

  export default ImageEditor;
}