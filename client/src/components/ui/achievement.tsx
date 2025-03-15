import { AchievementNotification } from "@/lib/animations";
import { useState, useEffect } from "react";

interface AchievementProps {
  title: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Achievement = ({ 
  title,
  message,
  isVisible,
  onClose
}: AchievementProps) => {
  const [visible, setVisible] = useState(isVisible);
  
  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <AchievementNotification
      isVisible={visible}
      onClose={handleClose}
      title={title}
      message={message}
    />
  );
};

export default Achievement;
