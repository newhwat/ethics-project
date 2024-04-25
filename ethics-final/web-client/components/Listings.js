import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import axios from "axios";
import { useRouter } from "next/router";

const Bg = styled.div`
    background-color: #3EB489;
    color: #fff;
    padding: 20px 0;
    width: 90%;
    border-radius: 20px;
    max-height: 140;
`;

const Title = styled.h3`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
`;

const Price = styled.p`
    color: #fff;
    font-size: 0.9rem;
`;

const ListingsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1.1fr));
    gap: 10px;
`;

const ColumnsWrapper = styled.div`
    background-color: rgb(250, 222, 168);
    max-height: 100px;
    border-radius: 20px;
    padding: 15px 10px;
    padding-bottom: 36px;
    display: grid;
    grid-template-columns: 0.6fr 0.4fr;
    gap: 40px;
    align-items: center;

    img {
        max-width: 70%;
        max-height: 125px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`;

export default function Listings({user, products}) {
    async function saveProduct(id) {
        const data = { id, user };
        await axios.post('/api/saved', data);
    }

    async function addToCart(id) {
        const data = { id, user };
        await axios.post('/api/cart', data);
    }

    return (
        <Bg>
            <Center>
                <ListingsContainer>
                {products?.map(product => (
                    <ColumnsWrapper>
                            <Column>
                                <div>
                                    <Title>
                                        {product.title}
                                    </Title>
                                    <ButtonWrapper>
                                        <ButtonLink reg outline white href={'/products/info/'+product._id}>See more</ButtonLink>
                                        <Button reg like onClick={() => saveProduct(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </Button>
                                    </ButtonWrapper>
                                </div>
                            </Column>
                            <Column>
                                <img src={product.images[0]} alt="" />
                            </Column>
                    </ColumnsWrapper>
                ))}
                </ListingsContainer>
            </Center>
        </Bg>
    );
}