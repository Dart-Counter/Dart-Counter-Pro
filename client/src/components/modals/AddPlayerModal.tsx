import PlayerForm from "@/components/player/PlayerForm";
import { InsertPlayer, Player } from "@/types";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (player: InsertPlayer) => void;
  player?: Player;
}

const AddPlayerModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  player 
}: AddPlayerModalProps) => {
  return (
    <PlayerForm
      isOpen={isOpen}
      onClose={onClose}
      onSave={onSave}
      player={player}
    />
  );
};

export default AddPlayerModal;
