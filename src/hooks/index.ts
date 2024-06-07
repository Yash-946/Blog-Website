import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blogs {
  "content": string;
  "title": string;
  "id": number
  "author": {
      "name": string
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bluk`,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then((response) => {
        setBlogs(response.data.blogs)
        setLoading(false)
      })
  }, [])

  // console.log(blogs);
  
  return {
    loading, blogs
  }
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blogs>();

  useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      }).then(response => {
              setBlog(response.data.post);
              setLoading(false);
          })
  }, [id])
  
  return {
      loading,
      blog
  }
}