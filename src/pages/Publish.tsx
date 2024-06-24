import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type BlogPost = {
  id: number;
  Title: string;
  Content: string;
  published?: boolean;
};

const Publish = ({id, Title, Content}:BlogPost) => {

  const [title, setTitle] = useState(Title || "");
  const [description, setDescription] = useState(Content || "");
  const navigate = useNavigate();
  const editor = useRef(null);

  useEffect(() => {
    if (Content) {
      setDescription(Content);
    } else {
      setDescription("");
    }
  }, [Content]);

  const options = [
    "bold",
    "italic",
    "|",
    "font",
    "fontsize",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "hr",
    "fullsize",
    "|",
    "link",
    "image",
    "video",
    "|",
    "preview",
    "undo",
    "redo",
  ];

  const config: any = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      // defaultActionOnPaste: 'insert_as_html',
      defaultLineHeight: 1.5,
      enter: "p",
      // uploader: { insertImageAsBase64URI: true },
      processVideoLink: true,
      processPastedLink: true,
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
      height: 350,
    }),
    []
  );

  const publishMutation = useMutation<any, Error, BlogPost>({
    mutationFn: (body) => {
      // console.log(body);
      return axios.post(`${BACKEND_URL}/api/v1/blog/`, body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },
    onSuccess: (response) => {
      navigate(`/blog/${response.data.blogID}`);
      // console.log(response.data.blogID);
    },
    onError: () => {
      toast.error("Failed to publish.")
    },
  });

  const handlePublish = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "" || description === "") {
      toast.error("Some Input fields must be empty.")
    } else {
      publishMutation.mutate({ title, content: description, published: true });
    }
  };

  const handleDraft = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "" || description === "") {
      toast.error("Some Input fields must be empty.")
    } else {
      publishMutation.mutate({ title, content: description });
    }
  };

  const handleUpdate = async () => {
    const response = await axios.put(
      `${BACKEND_URL}/api/v1/blog/`,
      {
        id,
        title,
        content: description,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    const data = response.data;
    // console.log(data);
    navigate(`/blog/${id}`);
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-xl w-full">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />

          {/* <TextEditor onChange={(e) => {
          setDescription(e.target.value)
          }} /> */}

          <JoditEditor
            ref={editor}
            value={description}
            onChange={(newchange) => setDescription(newchange)}
            config={config}
          />
          <div>
            {!Content && (
              <button
                onClick={handlePublish}
                type="submit"
                className="mt-4 mb-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Publish Story
              </button>
            )}
            {Content && (
              <button
                onClick={handleUpdate}
                type="submit"
                className="mt-4 mb-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
              >
                Upate Story
              </button>
            )}
            {!Content && (
              <button
              onClick={handleDraft}
              type="submit"
              className="mt-4 mb-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ml-3"
            >
              Save as Draft
            </button>
            )}
          </div>

          {/* {description} */}
        </div>
      </div>
    </div>
  );
};

export default Publish;

// function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
//   return <div className="mt-2">
//     <div className="w-full mb-4 ">
//       <div className="flex items-center justify-between border">
//         <div className="my-2 bg-white rounded-b-lg w-full">
//           <label className="sr-only">Publish post</label>
//           <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
//         </div>
//       </div>
//     </div>
//   </div>
// }
