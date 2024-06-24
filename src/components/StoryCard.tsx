import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import IconMenu from "./icons-menu";
import DeleteForm2 from "./DeleteForm";

interface StoryCardProps {
  id: number;
  title: string;
  content: string;
  publish: boolean;
}

function StoryCard({ id, title, content }: StoryCardProps) {

  const textContent = extractPTagText(content);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();


  const handleEdit = () => {
    navigate(`/update/${id}`);
  }

  return (
    <div>
      <DeleteForm2 setIsOpen={setIsDeleteOpen} isOpen={isDeleteOpen} ID={id} />

      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md ">
        <Link to={`/blog/${id}`}>
          <div className="cursor-pointer">
            <div className="text-xl font-semibold pt-2">{title}</div>

            <div className="text-md font-thin">
              {/* {content.slice(0, 100) + "..."} */}
              {textContent.slice(0, 100) +
                (textContent.length > 100 ? "..." : "")}
            </div>
          </div>
        </Link>

        <div className="flex text-slate-500 text-sm font-thin pt-4">
          {`${Math.ceil(textContent.length / 100)} minute(s) read`}
          <div className="ml-4 cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Ellipsis size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                  <button
                    onClick={handleEdit}
                    className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                  >
                    <IconMenu
                      text="Edit"
                      icon={<SquarePen className="h-4 w-4" />}
                    />
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                  <button
                    onClick={() => {
                      setIsDeleteOpen(true);
                    }}
                    className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-red-400 hover:text-black"
                  >
                    <IconMenu
                      text="Delete"
                      icon={<Trash2 className="h-4 w-4" />}
                    />
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

function extractPTagText(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const paragraphs = doc.querySelectorAll("p");
  return Array.from(paragraphs)
    .map((p) => p.textContent)
    .join(" ");
}

export default StoryCard;
