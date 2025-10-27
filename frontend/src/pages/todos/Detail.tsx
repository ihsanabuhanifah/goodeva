

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AIRecommendation from "@/components/AiRecommendation";
import type { SetStateAction } from "react";
import type { Todo } from "./service";

export default function DetailModal({
    selectedTodo,
    setSelectedTodo
}: {
    setSelectedTodo : SetStateAction<any>,
    selectedTodo : Todo
}){
    return (
        <Dialog  open={!!selectedTodo} onOpenChange={() => setSelectedTodo(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detail Todo</DialogTitle>
          </DialogHeader>

          {selectedTodo && (
            <div className="space-y-2">
              <p>
                <strong>Judul:</strong> {selectedTodo.title}
              </p>
              <p>
                <strong>Status:</strong> {selectedTodo.status}
              </p>
              <p>
                <strong>Deskripsi Masalah:</strong>{" "}
                {selectedTodo.problem_desc || "-"}
              </p>

              <div>
                <strong>Rekomendasi AI:</strong>{" "}
               <AIRecommendation text={selectedTodo?.ai_recommendation} />

                
              </div>
              <p>
                <strong>Dibuat pada:</strong>{" "}
                {new Date(selectedTodo.created_at).toLocaleString()}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
}