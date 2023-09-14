import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BiImage, BiPencil, BiPlusCircle } from "react-icons/bi";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ImageEditProps {
  initialData: {
    img_url: string;
  };
  courseId: number;
}

export const ImageEdit = ({ initialData, courseId }: ImageEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const navigate = useNavigate();

  const onSubmit = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/rails_upload_route", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.url;

      await axios.patch(`/api/courses/${courseId}`, { imageUrl });
      toast.success("Course updated");
      toggleEdit();
      navigate(-1);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between mb-2">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.img_url && (
            <>
              <BiPlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.img_url && (
            <>
              <BiPencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.img_url ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <BiImage className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <img
              alt="Upload"
              className="object-cover rounded-md"
              src={initialData.img_url}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
