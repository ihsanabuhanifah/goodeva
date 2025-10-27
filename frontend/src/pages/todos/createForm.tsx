


import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCreate } from "./service";


export default function CreateForm()  {
    const create = useCreate();
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
const [open, setOpen] = useState(false);
    const handleCreate = async () => {
    setError("");
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    if (title.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }

    try {
      await create.mutateAsync(title, {
        onSuccess: () => {
          setTitle("");
          setOpen(false);
        },
      });
    } catch {
      setError("Failed to create todo.");
    }
  };
    return (
        <Card>
        <CardHeader className="flex justify-between items-center flex-row">
          <CardTitle>Todo Manager</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Todo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Todo</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter todo title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreate}
                  disabled={create.isPending}
                  className="w-full"
                >
                  {create.isPending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>
    )
}