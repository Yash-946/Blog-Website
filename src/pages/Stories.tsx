import Appbar from "@/components/Appbar";
import { Spinner } from "@/components/Spinner";
import StoryCard from "@/components/StoryCard";
import { BACKEND_URL } from "@/config";
import { DeletedStory } from "@/store/atom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface Stories {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

function Stories() {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Stories[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const deleteStoryID = useRecoilValue(DeletedStory);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/api/v1/blog/me/stories`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setStories(response.data.blogs);
        setLoading(false);
      });
  }, [deleteStoryID]);

  const [activeTab, setActiveTab] = useState("draft");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`?tab=${tab}`, { replace: true });
  };

  return (
    <div>
      <Appbar />
      <div className="px-24 pt-14">
        <div className="">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">Your Stories</h1>
            <Link to={`/publish`} className="">
              <button
                type="button"
                className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Write a story
              </button>
            </Link>
          </div>

          <div className="mt-8 w-full">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
              </TabsList>
              <div className="border-b-2 py-2" />
              <TabsContent value="draft">
                {/* Render draft stories */}

                <div className="flex justify-center">
                  <div className="max-w-l">
                    {loading ? (
                      <Spinner />
                    ) : (
                      stories
                        .filter((story) => !story.published)
                        .map((story) => (
                          <StoryCard
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            content={story.content}
                            publish={false}
                          />
                        ))
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="published">
                <div className="flex justify-center">
                  <div className="max-w-l">
                    {loading ? (
                      <Spinner />
                    ) : (
                      stories
                        .filter((story) => story.published)
                        .map((story) => (
                          <StoryCard
                            key={story.id}
                            id={story.id}
                            title={story.title}
                            content={story.content}
                            publish={true}
                          />
                        ))
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stories;
