import React from 'react'

const Pagination = ({postsPerPage,totalPosts,handleClick}) => {
    const pagenum=[];

    for(let i=1;i<=Math.ceil(totalPosts/postsPerPage);i++)
    {
        pagenum.push(i);
    }


  return (
    <div className='flex gap-2  m-2'>
      {
        pagenum.map((item,i)=>(
          <a href='!#' onClick={()=>handleClick(i+1)} key={i} className='bg-blue-400 rounded-md p-1'>{i+1}</a>  
        ))//passing the handleClick fnc as  a prop from child to parent....
      }
    </div>
  )
}

export default Pagination
