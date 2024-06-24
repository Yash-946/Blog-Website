import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BACKEND_URL } from "@/config";
import { DeletedStory } from "@/store/atom";
import axios from "axios";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction, useState } from 'react';
import { useSetRecoilState } from "recoil";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>; 
  isOpen: boolean;
  ID: number;
}

const DeleteForm2 = ({ setIsOpen, isOpen, ID }: Props) => {
  const [loading, setLoading] = useState(false);

  // const handleOpen = () => {
  //   setIsOpen(true);
  // };

  const handleClose = () => {
    setIsOpen(false);
  };

  const setID = useSetRecoilState(DeletedStory)

  const handleDelete = async () => {

    console.log("Delete");
    setLoading(true);

    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${ID}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      const data = response.data;
      console.log(data);
      setID({id:ID})

    } catch (error) {
      console.error("Error deleting the story", error);
    } finally {
      setLoading(false);
      handleClose(); 
    }
  }

  return (
    <div>
      <AlertDialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        {/* <AlertDialogTrigger><Button onClick={handleOpen}>Delete</Button></AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Story</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Are you sure to delete this story permanently?
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-600"
            >
              {loading && <Loader className="mr-2" size="18" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteForm2;
