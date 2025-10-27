"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Check, X, Pencil, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Swal from "sweetalert2";

import { useGetList, useUpdate } from "./service";
import CreateForm from "./createForm";
import { type TodoStatus, type Todo } from "./service";
import DetailModal from "./Detail";

export default function TodoPage() {
  const { data: todos, isFetching, handleSearch, search , error} = useGetList();
  const update = useUpdate();

  const [editId, setEditId] = useState<string>("");
  const [editValues, setEditValues] = useState<Todo>({
    title: "",
    status: "created",
    problem_desc: "",
  });

  const [selectedTodo, setSelectedTodo] = useState<any | null>(null);

  const handleEdit = (todo: any) => {
    setEditId(todo.id);
    setEditValues({
      title: todo.title,
      status: todo.status,
      problem_desc: todo.problem_desc || "",
    });
  };

  const handleSave = async () => {
    if (editValues.status === "problem" && !editValues.problem_desc.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Deskripsi wajib diisi",
        text: "Harap isi deskripsi masalah jika status adalah 'problem'.",
      });
      return;
    }

    try {
      update.mutate(
        {
          ...editValues,
          id: editId as string,
        },
        {
          onSuccess: () => {
            setEditId("");
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil diperbarui!",
              timer: 1200,
              showConfirmButton: false,
            });
          },
        }
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan",
        text: "Terjadi kesalahan saat memperbarui todo.",
      });
    }
  };

  const handleCancel = () => setEditId("");

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      {/* Header */}
      <CreateForm />

      {/* Search */}
      <Card>
        <CardContent className="flex gap-2 mt-4">
          <Input
            placeholder="Cari Title"
            value={search}
            onChange={handleSearch}
          />
        </CardContent>
      </Card>

      {/* Loading State */}
      {isFetching ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin w-6 h-6 mr-2 text-blue-500" />
          <span>Memuat data...</span>
        </div>
      ) : error ?  <div className="flex items-center justify-center h-40">
          
          <span>Internal Server Error</span>
        </div> : todos?.data?.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-500 italic">
          Data tidak ditemukan.
        </div>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deskripsi Masalah</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos?.data?.map((todo: any, index: number) => (
              <TableRow key={todo.id}>
                <TableCell>{index + 1}</TableCell>

                {/* Title */}
                <TableCell>
                  {editId === todo.id ? (
                    <Input
                      value={editValues.title}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <span className="font-medium">{todo.title}</span>
                  )}
                </TableCell>

                {/* Status */}
                <TableCell>
                  {editId === todo.id ? (
                    <Select
                      value={editValues.status}
                      onValueChange={(value: TodoStatus) =>
                        setEditValues({ ...editValues, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created">Created</SelectItem>
                        <SelectItem value="on_going">On Going</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="problem">Problem</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <span>{todo.status}</span>
                  )}
                </TableCell>

                {/* Problem Desc */}
                <TableCell>
                  {editId === todo.id ? (
                    <Textarea
                      rows={2}
                      value={editValues.problem_desc}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          problem_desc: e.target.value,
                        })
                      }
                      placeholder={
                        editValues.status === "problem"
                          ? "Tuliskan deskripsi masalah..."
                          : "Opsional"
                      }
                    />
                  ) : (
                    todo.problem_desc || "-"
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="flex items-center justify-center gap-2">
                  {editId === todo.id ? (
                    <>
                      <Button
                        disabled={update.isPending}
                        size="icon"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={handleSave}
                      >
                       {update.isPending ? <Loader2 className="animate-spin w-6 h-6 mr-2 text-blue-500"/> :  <Check className="h-4 w-4 text-white" />}
                      </Button>
                      <Button
                        disabled={update.isPending}
                        size="icon"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 text-white" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(todo)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setSelectedTodo(todo)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <DetailModal
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
      />
    </div>
  );
}
