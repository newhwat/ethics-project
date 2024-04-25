import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TopicForm({
    _id,
    name:existingName,
    description:existingDescription,
  }) {
    const [name,setName] = useState(existingName || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [goToTopics,setGoToTopics] = useState(false);
    const router = useRouter();

    async function saveTopic(ev) {
        ev.preventDefault();
        const data = {
            name,description
        };
        if (_id) {
            //update
            await axios.put('/api/topics', {...data,_id});
        } else {
            //create
            await axios.post('/api/topics', data);
        }
        setGoToTopics(true);
    }

    if (goToTopics) {
        router.push('/topics');
    }

    return (
        <form onSubmit={saveTopic}>
            <label>Topic name</label>
            <input type="text" placeholder="topic name" value={name} onChange={ev => setName(ev.target.value)}/>
            <label>Description</label>
            <textarea placeholder="description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>    
            <button type="submit" className="btn-primary">Save</button>    
        </form>
    );
  }