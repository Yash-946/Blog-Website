import Appbar from "@/components/Appbar";
import { Spinner } from "@/components/Spinner";
import StoryCard from "@/components/StoryCard";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Stories {
  "id": number
  "title": string;
  "content": string;
  "published": boolean,
}

function Stories() {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Stories[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/me/stories`,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then((response) => {
        setStories(response.data.blogs)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <Appbar />
      <div className="px-24 pt-14">
        <div className="flex justify-between border-b-2 pb-14">
          <h1 className="text-4xl font-bold">Your Stories</h1>
          <Link to={`/publish`} className="">
            <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Write a story</button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className='max-w-l'>
          {loading && <div className="mt-10">
            <Spinner />
          </div>}
          {!loading && stories.map((story,index) => <StoryCard
            key={index}
            id={story.id}
            title={story.title}
            content={story.content}
            publish={false}
          />)}
        </div>
      </div>
    </div>
  )
}

export default Stories;