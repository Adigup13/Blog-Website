
import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { useBlogs } from "../Hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
export const Blogs = () =>{
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
                 <Appbar /> 
       
     <div className="flex  justify-center">
  <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
        <div>
            {blogs.map(blog=> <Blogcard
                id  = {blog.id}
                authorname= {blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={"2nd Feb 2024"}
            />)}
        </div>
    </div>
</div>

}