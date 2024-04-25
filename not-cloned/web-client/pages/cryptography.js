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

export default function cryptographyPage({featuredProduct, cryptography, user}) {
  return (
    <Page>
      <Header user={user}/>
      <Featured user={user?._id} product={featuredProduct}/>
      <Categories />
      <Listings user={user?._id} products={cryptography}/>
    </Page>
  );
}

export async function getServerSideProps() {
  const tempUserId = '662996940d664ef7f537100f'; // CHANGE THIS WHEN WE HAVE LOGIN
  const featuredProductId = '6629c1b3af63c865390ef8cd';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const cryptography = await Product.find({topic: 'Cryptography'}, null, {sort: {'_id':-1}, limit:10});
  const user = await User.findById(tempUserId);

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      cryptography: JSON.parse(JSON.stringify(cryptography)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}