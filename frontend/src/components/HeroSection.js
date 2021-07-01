import React from 'react'
import styled from 'styled-components/macro'
import Video from '../assets/hero-video.mp4'
import { MdArrowForward } from 'react-icons/md'
import { Link } from 'react-router-dom'

const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  paddind: 0 30px;
  postion: relative;
  z-index: 1;
  height: 100%;
`
const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const HeroVideo = styled.video`
  width: 100%;
  height: 100%;
  margin-top: 80px;
  background: #232a34;
  -0-object-fit: cover;
  object-fit: cover;

  @media (min-width: 668px) {
    margin-top: 60px;
  }
`

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: aboslute;
  padding: 2px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 95%;

  @media (min-width: 668px) {
    height: 100%;
  }
`

const HeroH1 = styled.h1`
  color: #000;
  font-size: 28px;
  text-align: center;
  margin: 14px 0 15px 0;

  @media (min-width: 668px) {
    font-size: 48px;
  }
`

const HeroBtnWrapper = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: 668px) {
    font-size: 48px;
  }
`

const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`

const Button = styled(Link)`
  border-radius: 50px;
  background: #000;
  white-space: nowrap;
  padding: 10px 40px;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: flex;
  justify-content: center:
  align-items: center;

  &:hover {
    background: #191919;
    color: #fff;
    transition: all 0.2s ease-in-out;
  }

  @media (min-width: 668px) {
    padding: 14px 48px;
    font-size: 16px;
  }
`

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroBackground>
        <HeroVideo 
          autoPlay muted src={Video} 
          type='video/mp4' 
        />
      </HeroBackground>
      <HeroContent>
        <HeroH1>Make your habits stick!</HeroH1>
        <HeroBtnWrapper>
          <Button to='signup'>
            Get started <ArrowForward />
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
