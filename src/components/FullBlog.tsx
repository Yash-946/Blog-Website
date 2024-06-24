import { Blogs } from "../hooks";
import Appbar from "../components/Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {

  // console.log(blog);
  const createAt = blog.createdAt;
  const date = createAt.split('T')[0];
  // console.log(date);
  
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8 pb-10">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="flex">
              <div className="text-slate-500 pt-2">
                Last Edited on {date}
              </div>
              <div className="mt-2 ml-2">
                {blog.published ? (
                  <span className="blink_me inline-block w-2.5 h-2.5 border border-green-500 bg-green-500 rounded-full animate-blinker"></span>
                ) : (
                  <span className="blink_me inline-block w-2.5 h-2.5 border border-red-500 bg-red-500 rounded-full animate-blinker"></span>
                )}
              </div>
            </div>

            <div className="pt-4">
              {/* {blog.content} */}
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>

          {/* Author info */}
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
