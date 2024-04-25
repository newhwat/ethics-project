import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";

const YesBtn = styled.button`
  background-color: red;
  border-radius: 5px;
  padding: 1px 3px;
  align-items: center;
`;

const NoBtn = styled.button`
  background-color: gray;
  border-radius: 5px;
  padding: 1px 3px;
  align-items: center;
`;

export default function DeleteTopicPage() {
  const router = useRouter();
  const [topicInfo,setTopicInfo] = useState();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/topics?id='+id).then(response => {
      setTopicInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push('/topics');
  }
  async function deleteTopic() {
    await axios.delete('/api/topics?id='+id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete
        &nbsp;&quot;{topicInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <YesBtn onClick={deleteTopic}>Yes</YesBtn>
        <NoBtn onClick={goBack}>NO</NoBtn>
      </div>
    </Layout>
  );
}