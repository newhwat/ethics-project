import Featured from "@/components/Featured";
import Listings from "@/components/Listings";
import Header from "@/components/Header";
import Categories from "@/components/Categories";
import {Product} from "@/models/Course";
import {mongooseConnect} from "@/lib/mongoose";
import styled from "styled-components";
import { User } from "@/models/User";

const Page = styled.div`
  background-color: rgb(250, 222, 168);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  overflow: scroll;
  padding-bottom: 100px;
`;

export default function RevPage({featuredProduct, Rev, user}) {
  return (
    <Page>
      <Header user={user}/>
      <Featured user={user?._id} product={featuredProduct}/>
      <Categories />
      <Listings user={user?._id} products={Rev}/>
    </Page>
  );
}

export async function getServerSideProps() {
  const tempUserId = '6606c52955e3c5a7c65fed2f'; // CHANGE THIS WHEN WE HAVE LOGIN
  const featuredProductId = '6629c1b3af63c865390ef8cd';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const Rev = await Product.find({topic: 'Reverse Engineering'}, null, {sort: {'_id':-1}, limit:10});
  const user = await User.findById(tempUserId);
  console.log(Rev);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      Rev: JSON.parse(JSON.stringify(Rev)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}