import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import TopicForm from "@/components/TopicForm";

export default function EditTopicPage() {
  const [topicInfo, setTopicInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/topics?id='+id).then(response => {
      setTopicInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit topic</h1>
      {topicInfo && (
        <TopicForm {...topicInfo} />
      )}
    </Layout>
  );
}