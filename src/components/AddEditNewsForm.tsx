import { deleteImage, getImageUrl, uploadImage } from "@/lib/supabase";
import { addNewsFormSchema } from "@/lib/validation";
import { News } from "@/models/news";
import { createNews, updateNews } from "@/network/NewsApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tiptap from "./TipTap";
import { Button } from "./ui/button";

export interface newsBody {
  title?: string | undefined;
  image?: File | undefined;
  imageName?: string | undefined;
  oldImageName?: string | undefined;
  content?: string | undefined;
  category?: string | undefined;
  status?: string | undefined;
}

interface AddEditNewsFormProps {
  type?: "ADD" | "EDIT";
  data?: News | undefined;
}

export default function AddEditNewsForm({ type, data }: AddEditNewsFormProps) {
  const [newsData, setNewsData] = useState<newsBody>({
    title: "",
    image: undefined,
    imageName: "",
    oldImageName: "",
    content: "",
    category: "",
    status: "",
  });

  const [error, setError] = useState<{
    errorTitle: string;
    errorDesc: string[];
  } | null>(null);

  useEffect(() => {
    if (type === "EDIT") {
      setNewsData({
        ...newsData,
        title: data?.title,
        oldImageName: data?.image,
        content: data?.content,
        category: data?.category,
        status: data?.status,
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const images = e.target.files;
      if (images?.length) {
        const image = images[0];
        const imageExtension = image.name.split(".").pop();
        return setNewsData({
          ...newsData,
          image: image,
          imageName: Date.now().toString() + "." + imageExtension,
        });
      } else {
        return console.log("No File Selected");
      }
    }
    const name = e.target.name;
    const value = e.target.value;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "ADD") {
      const validate = addNewsFormSchema.safeParse({
        title: newsData.title,
        content: newsData.content,
        image: newsData.imageName,
        category: newsData.category,
        status: newsData.status,
      });
      if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message);
        alert("Validasi Gagal");
        return setError({
          errorTitle: "Error Validation",
          errorDesc,
        });
      }
    }

    if (type === "EDIT") {
      const EditNewsFormSchema = addNewsFormSchema.omit({ image: true });
      const validate = EditNewsFormSchema.safeParse({
        title: newsData.title,
        content: newsData.content,
        category: newsData.category,
        status: newsData.status,
      });
      if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message);
        alert("Validasi Gagal");
        return setError({
          errorTitle: "Error Validation",
          errorDesc,
        });
      }
    }

    if (type === "ADD") {
      const addNews = await createNews({
        title: newsData?.title,
        content: newsData?.content,
        image: newsData?.imageName,
        category: newsData?.category,
        status: newsData?.status,
      });

      if (addNews.isAddSuccess) {
        if (newsData.image && newsData.imageName) {
          console.log("Upload!!");
          uploadImage(newsData.image, newsData.imageName);
        }
        alert("Data berhasil ditambahkan");
        navigate("/dashboard/news");
        return;
      } else {
        alert("Data gagal ditambahkan");
      }
    }

    if (type === "EDIT") {
      let imageName;
      if (newsData.image && newsData.imageName) {
        imageName = newsData.imageName;
      } else {
        imageName = newsData.oldImageName;
      }

      const updatedNews = await updateNews(
        {
          title: newsData?.title,
          content: newsData?.content,
          image: imageName,
          category: newsData?.category,
          status: newsData?.status,
        },
        data?._id
      );

      if (updatedNews.isUpdateSuccess) {
        if (newsData.image && newsData.imageName) {
          console.log("Pakai gambar baru");
          uploadImage(newsData.image, newsData.imageName);
          deleteImage(newsData.oldImageName);
        }
        alert("Data berhasil diupdate");
        return navigate("/dashboard/news");
      } else {
        alert("Data gagal diupdate");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-700 rounded mt-2 p-2 text-white">
          <p className="font-semibold">{error.errorTitle}</p>
          <ol className="list-disc text-md ml-4">
            {error.errorDesc.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ol>
        </div>
      )}
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="" className="font-semibold">
              News Title
            </label>
            <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
              <input
                type="text"
                name="title"
                id="title"
                value={newsData?.title}
                onChange={handleChange}
                placeholder="Masukkan Judul..."
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              News Image
            </label>
            <div className="w-full bg-transparent outline-none rounded-md border-2 p-2 flex gap-2 items-center mt-1">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                placeholder="Masukkan Gambar..."
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="bg-slate-500 w-1/2 mx-auto">
          <img src={getImageUrl(newsData?.oldImageName)} alt="" />
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <label htmlFor="newsContent" className="font-semibold">
            News Content
          </label>
          <div className="w-full mt-2">
            <Tiptap newsData={newsData} setNewsData={setNewsData} />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="category" className="font-semibold">
          News Category :
        </label>
        <select
          value={newsData?.category}
          onChange={handleSelectChange}
          name="category"
          id="category"
          className="ml-2 border-2 bg-transparent outline-none rounded-md p-1 font-semibold"
        >
          <option value={""}>Select Category</option>
          {["politics", "sports", "health", "business", "travel"].map(
            (category, index) => (
              <option value={category} key={index}>
                {category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </option>
            )
          )}
        </select>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="radio"
            checked={newsData?.status === "published"}
            onChange={handleChange}
            name="status"
            id="publish"
            value="published"
          />
          <label htmlFor="publish">Publish</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            checked={newsData?.status === "drafted"}
            onChange={handleChange}
            name="status"
            id="draft"
            value="drafted"
          />
          <label htmlFor="draft">Draft</label>
        </div>
      </div>

      <Button className="text-md bg-blue-500 mt-5 w-fit">Add</Button>
    </form>
  );
}
