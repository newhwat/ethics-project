import TopicForm from "@/components/TopicForm";
import Layout from "@/components/Layout";

export default function NewTopic() {
    return (
        <Layout>
            <h1>New Topic</h1>
            <TopicForm/>   
        </Layout>
    );
}