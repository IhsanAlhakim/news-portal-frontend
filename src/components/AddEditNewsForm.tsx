import { useToast } from "@/hooks/use-toast";
import { deleteImage, getImageUrl, uploadImage } from "@/lib/supabase";
import { addNewsFormSchema } from "@/lib/validation";
import { News } from "@/models/news";
import { createNews, updateNews } from "@/network/NewsApi";
import { type Error } from "@/types/error";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
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
  data?: News | null;
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    let fileReader: FileReader | null;
    let isCancel = false;
    if (newsData.image) {
      fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string | null;
        if (result && !isCancel) {
          setPreviewImage(result);
        }
      };
      fileReader.readAsDataURL(newsData.image);
    }
    return () => {
      //return di useEffect = Cleanup code to run when the component unmounts
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
      fileReader = null;
    };
  }, [newsData.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const images = e.target.files;
      if (images?.length) {
        const image = images[0];
        if (image.size > 1024 * 1024) {
          toast({
            title: "Image Size Too Big",
            description: "Please Select Image with size lower than 1MB",
          });
          return;
        }

        // if (previewImage) {
        //   URL.revokeObjectURL(previewImage);
        // }

        // const imageUrl = URL.createObjectURL(image);
        // setPreviewImage(imageUrl);

        const imageExtension = image.name.split(".").pop();

        return setNewsData({
          ...newsData,
          image: image,
          imageName: Date.now().toString() + "." + imageExtension,
        });
      } else {
        toast({
          title: "No Image",
          description: "Please Select an Image",
        });
        return;
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
        return setError({
          errorTitle: "Error Validation",
          errorDesc,
        });
      }

      const addNews = await createNews({
        title: newsData?.title,
        content: newsData?.content,
        image: newsData?.imageName,
        category: newsData?.category,
        status: newsData?.status,
      });

      if (addNews.isAddSuccess) {
        if (newsData.image && newsData.imageName) {
          uploadImage(newsData.image, newsData.imageName);
        }

        toast({
          title: "Success",
          description: "News Added Successfully",
        });

        if (previewImage) {
          URL.revokeObjectURL(previewImage);
          setPreviewImage(null);
        }

        return navigate("/dashboard/news");
      } else {
        toast({
          title: "Failed",
          description: "Failed to Add Data, Please Try Again Later",
        });

        if (previewImage) {
          URL.revokeObjectURL(previewImage);
          setPreviewImage(null);
        }

        return navigate("/dashboard/news");
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
        return setError({
          errorTitle: "Error Validation",
          errorDesc,
        });
      }

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
          uploadImage(newsData.image, newsData.imageName);
          deleteImage(newsData.oldImageName);
        }

        if (previewImage) {
          URL.revokeObjectURL(previewImage);
          setPreviewImage(null);
        }

        toast({
          title: "Success",
          description: "Data Updated Successfully",
        });
        return navigate("/dashboard/news");
      } else {
        toast({
          title: "Failed",
          description: "Failed to Update Data, Please Try Again Later",
        });

        if (previewImage) {
          URL.revokeObjectURL(previewImage);
          setPreviewImage(null);
        }

        return navigate("/dashboard/news");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ErrorMessage error={error} />
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
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold">
              News Category
            </label>
            <select
              value={newsData?.category}
              onChange={handleSelectChange}
              name="category"
              id="category"
              className="border-2 bg-transparent outline-none rounded-md p-2 font-semibold mt-1"
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
          <div>
            <label htmlFor="newsContent" className="font-semibold">
              News Content
            </label>
            <div className="w-full mt-2">
              <Tiptap newsData={newsData} setNewsData={setNewsData} />
            </div>
          </div>
          <div className="my-4 flex gap-5">
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
          <Button className="text-md bg-violet-900 hover:bg-violet-950 w-fit">
            {type === "ADD" ? "Add" : "Update"}
          </Button>
        </div>
        <div className="bg-violet-950 w-3/4 h-60 mx-auto">
          {previewImage && (
            <img src={previewImage} className="w-full h-full object-cover" />
          )}

          {newsData.oldImageName && !previewImage && (
            <img
              src={getImageUrl(newsData?.oldImageName)}
              className="w-full h-full object-cover"
            />
          )}

          {!previewImage && !newsData.oldImageName && (
            <div className="flex justify-center items-center w-full h-full">
              <div>
                <p className="text-2xl text-white">No Image</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
