import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Loader";
import {ReactSortable} from "react-sortablejs";
import styled from "styled-components";

const PlaceholderText = styled.div`
    color: #A9A9AC;
`;

const PhotoDiv = styled.div`
    margin-top: 10px;
`;

const TopicDiv = styled.div`
    display: flex;
    flex-direction: column;
    select {
        color: #000;
    }
`;

export default function CourseForm({
  _id,
  title:existingTitle,
  description:existingDescription,
  images:existingImages,
  topic:assignedTopic,
}) {
    const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [topic,setTopic] = useState(assignedTopic || '');
    const [images,setImages] = useState(existingImages || []);
    const [goToCourses,setGoToCourses] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [topics,setTopics] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/topics').then(result => {
        setTopics(result.data);
        })
    }, []);

    async function saveCourse(ev) {
        ev.preventDefault();
        const data = {
            title,description,images,topic
        };
        if (_id) {
            //update
            await axios.put('/api/courses', {...data,_id});
        } else {
            //create
            await axios.post('/api/courses', data);
        }
        setGoToCourses(true);
    }

    if (goToCourses) {
        router.push('/courses');
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    return (
        <form onSubmit={saveCourse}>
            <label>Course name</label>
            <input type="text" placeholder="course name" value={title} onChange={ev => setTitle(ev.target.value)}/>

            <TopicDiv>
                <label>Topic</label>
                <select value={topic} onChange={ev => setTopic(ev.target.value)}>
                    <option value="">Uncategorized</option>
                    {topics.length > 0 && topics.map(c => (
                        <option>{c.name}</option>
                    ))}
                </select>
            </TopicDiv>

            <PhotoDiv>
                <label>
                    Photos
                </label>
                <div className="mb-2 flex flex-wrap gap-1">
                    <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
                        {!!images?.length && images.map(link => (
                        <div key={link} className="h-24 bg-white shadow-sm rounded-sm border border-gray-200">
                            <img id={link} src={link} alt="" className="h-full rounded-lg"/>
                            
                        </div>
                        ))}
                    </ReactSortable>

                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    
                    <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#A9A9AC" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        <PlaceholderText>
                            Add image
                        </PlaceholderText>
                        <input type="file" onChange={uploadImages} className="hidden"/>
                    </label>
                </div>
            </PhotoDiv>

            <label>Description</label>
            <textarea
            placeholder="description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            />
            <button
            type="submit"
            className="btn-primary">
            Save
            </button>
        </form>
    );
}