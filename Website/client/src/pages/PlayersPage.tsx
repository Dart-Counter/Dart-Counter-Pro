import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PlayerCard from "@/components/player/PlayerCard";
import AddPlayerModal from "@/components/modals/AddPlayerModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Player, InsertPlayer } from "@/types";
import { FadeIn, SlideIn } from "@/lib/animations";

const PlayersPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const { toast } = useToast();

  // Fetch players
  const { data: players = [], isLoading } = useQuery<Player[]>({
    queryKey: ["/api/players"],
  });

  // Add player mutation
  const addPlayerMutation = useMutation({
    mutationFn: async (playerData: InsertPlayer) => {
      const response = await apiRequest("POST", "/api/players", playerData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
      toast({
        title: "Success",
        description: "Player added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add player: ${error}`,
        variant: "destructive",
      });
    },
  });

  // Update player mutation
  const updatePlayerMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: InsertPlayer }) => {
      const response = await apiRequest("PUT", `/api/players/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
      toast({
        title: "Success",
        description: "Player updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update player: ${error}`,
        variant: "destructive",
      });
    },
  });

  // Delete player mutation
  const deletePlayerMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/players/${id}`, undefined);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
      toast({
        title: "Success",
        description: "Player deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete player: ${error}`,
        variant: "destructive",
      });
    },
  });

  const handleAddPlayer = () => {
    setSelectedPlayer(null);
    setIsAddModalOpen(true);
  };

  const handleEditPlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsAddModalOpen(true);
  };

  const handleDeletePlayer = (player: Player) => {
    setSelectedPlayer(player);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePlayer = () => {
    if (selectedPlayer) {
      deletePlayerMutation.mutate(selectedPlayer.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSavePlayer = (playerData: InsertPlayer) => {
    if (selectedPlayer) {
      updatePlayerMutation.mutate({ id: selectedPlayer.id, data: playerData });
    } else {
      addPlayerMutation.mutate(playerData);
    }
  };

  return (
    <FadeIn>
      <Card className="bg-panel border-2 border-primary mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-['Orbitron'] text-primary text-xl">Players</h2>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleAddPlayer}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Player
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading players...</p>
            </div>
          ) : players.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg mb-2">No Players Yet</h3>
              <p className="text-muted-foreground mb-4">Add your first player to get started</p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleAddPlayer}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Player
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player, index) => (
                <SlideIn key={player.id} delay={index * 0.05} direction="up">
                  <PlayerCard
                    player={player}
                    onEdit={handleEditPlayer}
                    onDelete={handleDeletePlayer}
                  />
                </SlideIn>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Player Modal */}
      <AddPlayerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavePlayer}
        player={selectedPlayer || undefined}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-panel border-2 border-primary">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">Delete Player</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedPlayer?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-panel border border-primary text-foreground hover:bg-panel/90">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDeletePlayer}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FadeIn>
  );
};

export default PlayersPage;
