import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const StyledHeader = styled.header`
    background-color: rgb(250, 222, 168);
`;

const LogoContainer = styled.div`
    width: 50%;
`;

const Logo = styled(Link)`
    color: #fff;
    text-decoration: none;

    #gator {
        width: 40%;
        padding-right: 10px;
    }

    #logo {
        width: 50%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
`;

const SearchBar = styled(Link)`
    color: #000;
    width: 100%;
    height: 75%;
    align-content: center;
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    text-decoration: none;

    svg {
        width: 20px;
        color: #000;
    }

    input {
        background-color: #fff;
        border-radius: 10px;
        border: none;
        height: 30px;
        width: 90%;
        margin-left: 5px;
        padding-left: 5px;
    }

    input:focus {
        outline: none;
    }
`;

const StyledNav = styled.nav`
    width: 50%;
    display: flex;
    gap: 15px;
    padding-top: 10px;
`;

const NavLink = styled(Link)`
    color: black;
    text-decoration: none;

    svg {
        width: 40%;
    }
`;

export default function Header({user}) {
   const[search, setSearch] = useState('');
   
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <LogoContainer>
                        <Logo href={'/'}><img id="logo" src="/images/logo2.svg" alt="Logo" /></Logo>
                    </LogoContainer>
                    <SearchBar href={'/search'}> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input 
                            autoFocus
                            placeholder="Search Ethical Cybergators..."
                            value={search}
                            onChange={(ev) => setSearch(ev.target.value)}
                            // onKeyPress={handleKeyPress}
                            />
                    </SearchBar>
                    <StyledNav>
                        <NavLink href={'/users/saved/'+user?._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </NavLink>
                        <NavLink href={'/users/profile/'+user?._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </NavLink>
                    </StyledNav>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}