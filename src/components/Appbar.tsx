import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BookText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

function Appbar() {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  // console.log(pathname);
  

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };
  const name = localStorage.getItem("name");
  return (
    <div className="border-b flex justify-between px-10 py-2">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer font-bold text-2xl"
      >
        Medium
      </Link>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className={cn(
              "mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2",
              (pathname === "/publish") && "bg-green-300 hover:bg-green-300"

            )}
            disabled={pathname === "/publish"? true:false}
          >
            New
          </button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar size={"big"} name={name!} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 mr-2">
            <Link to={`/me/stories`}>
              <DropdownMenuItem>
                <BookText className="mr-2 h-4 w-4" />
                Stories
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Appbar;
