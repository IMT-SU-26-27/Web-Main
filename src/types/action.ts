export interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormProps<T> {
  mode: "create" | "edit";
  data?: T;
}

export interface ApplyButtonProps {
  bgColor?: string;
  children: React.ReactNode;
  className?: string;
  activityId: string;
  confirmApply?: (onConfirm: () => Promise<void>) => void;
  startDate?: Date;
  quota?: number;
  approvedCount?: number;
}

export interface UploadWidgetProps {
  onUploadSuccess: (url: string, publicId?: string) => void;
  folder: string;
  allowedFormats: string[];
}

export interface ArrowButtonProps {
  onClick: () => void;
  direction: "left" | "right";
  extraClass: string;
}