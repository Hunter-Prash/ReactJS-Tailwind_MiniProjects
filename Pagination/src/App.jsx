import { useEffect, useState } from 'react'
import './App.css'
import fetchData from './GlobalApi'
import Pagination from './Pagination';


function App() {
  const [posts,setPosts]=useState([]);

  const [currPage,setCurrPage]=useState(1);
  const [postPerPage,setPostPerPage]=useState(10);//10 posts per page

 

  useEffect(()=>{
    const fetchPosts=async()=>{
        const apiData=await fetchData();
        console.log(apiData);
        setPosts(apiData);//getting data from the api....
    }
    fetchPosts();
  },[])

  const idx_of_last_post=currPage*postPerPage;//getting last post idx in the current active page
  const idx_of_first_post=idx_of_last_post-postPerPage;//getting first post idx in the curr active page

  let currPosts=posts.slice(idx_of_first_post,idx_of_last_post);
 
//handleing the main logic of changing data when the number of paginaation is clicked  
  const handleClick=(pageNum)=>{//this fnc is the fnc we define after getting the data from child component ...
    setCurrPage(pageNum);
  }
  return (
    <div className='flex flex-col'>

        {currPosts.map((item,i)=>(
          <li className='m-1 p-2 bg-slate-300 rounded-md w-[50%]'>{item.title}</li> 
        ))}
        
        {/*notice that we have maaped through the currPosts variable which is not a state variable of react..it is a standard JS variavble...all the questions i have solved untill now in those , i mapped over a state variable  but here i map over a JS var which is also possible.....*/}

        <Pagination postsPerPage={postPerPage} totalPosts={posts.length} handleClick={handleClick}/>
 
        
    </div>
  )
}

export default App
