import { useBlog } from "@/hooks";
import { useParams } from "react-router-dom";
import Publish from "./Publish";
import Appbar from "@/components/Appbar";
import { Spinner } from "@/components/Spinner";

export default function UpdateBlog() {
  const { id } = useParams();
  console.log(id);
  const { loading, blog } = useBlog({
    id: id || "",
  });
  console.log(loading, blog);

  if (loading || !blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Publish id={blog?.id} Content={blog?.content} Title={blog?.title} />
    </div>
  );
}
