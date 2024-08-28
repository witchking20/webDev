import React, { useState, useEffect } from 'react';

function Test() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/noticeboard');
        const data = await response.json();
        setPosts(data);
        setLoading(false); 
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="App">
      <h1>최근 게시물 3개</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.post_id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>카테고리: {post.category}</small><br/>
            <small>작성자 ID: {post.user_id}</small><br/>
            <small>작성일: {post.written_datetime}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;