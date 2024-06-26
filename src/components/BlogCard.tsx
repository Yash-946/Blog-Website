import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {

  const textContent = extractPTagText(content);
  // console.log(textContent);
  console.log(publishedDate);
  const createDate = publishedDate.split('T')[0];
  console.log(createDate);
  
  
  
  return (
    <Link to={`/blog/${id}`}>
      <div>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">

          <div className={cn(
            "flex",
            )}>
            <Avatar name={authorName} />
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            <div className="flex justify-center flex-col pl-2">
              <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
              {createDate}
            </div>
          </div>

          <div className="text-xl font-semibold pt-2">
            {title}
          </div>

          <div className="text-md font-thin">
            {/* {content.slice(0, 100) + "..."} */}
            {textContent.slice(0, 100) + (textContent.length > 100 ? "..." : "")}
          </div>

          <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(textContent.length / 100)} minute(s) read`}
          </div>

        </div>
      </div>
    </Link>
  )
}

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500">
  </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-white dark:text-white `}>
      {name[0].toUpperCase()}
    </span>
  </div>
}

function extractPTagText(html : string) :string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const paragraphs = doc.querySelectorAll('p');
  return Array.from(paragraphs).map(p => p.textContent).join(' ');
}

export default BlogCard