import { useParams } from "react-router-dom"
import { useBlog } from "../Hooks";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
export const Blog  =() => {
    const {id} = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
      if(loading || !blog) {
        return <div>
            <Appbar></Appbar>
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner></Spinner>
                </div>
            </div>
        </div>
      }
    return <div>
   <FullBlog blog={blog} />
    </div>
}
