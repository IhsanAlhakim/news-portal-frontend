import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Email harus diisi" })
    .email({ message: "Email tidak valid" }),
  password: z
    .string({ required_error: "Password Harus Diisi" })
    .min(5, { message: "Password harus memiliki minimal 5 karakter" }),
});

export const addNewsFormSchema = z.object({
  title: z
    .string({ required_error: "Judul harus diisi" })
    .min(5, { message: "Judul memiliki setidaknya 5 karakter" }),
  content: z
    .string({ required_error: "Konten harus diisi" })
    .min(10, { message: "Konten memiliki setidaknya 10 karakter" }),
  image: z
    .string({ required_error: "Gambar harus diisi" })
    .min(3, { message: "Nama Gambar memiliki setidaknya 3 karakter" }),
  category: z
    .string({ required_error: "Kategori harus diisi" })
    .min(3, { message: "Kategori memiliki setidaknya bukan string kosong" }),
  status: z.string({ required_error: "Status harus diisi" }),
});

export const addCommentFormSchema = z.object({
  comment: z
    .string({ required_error: "Komentar harus diisi" })
    .min(2, { message: "Komentar tidak boleh kosong" }),
});
