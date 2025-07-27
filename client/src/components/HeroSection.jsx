import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div
      className='relative h-screen bg-cover bg-center bg-no-repeat'
      style={{
        backgroundImage: 'url("/src/assets/robert-stump-bwpgwJesFhw-unsplash.jpg")',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center text-center h-full gap-5 px-4'>
        <span className='px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>
          No. 1 Job Hunt Website
        </span>
        <h1 className='text-white text-5xl font-bold leading-tight'>
          Search, Apply & <br /> Land Your <span className='text-[#A78BFA]'>Dream Jobs</span>
        </h1>
        <p className='text-white max-w-2xl text-lg'>
          Unlock your career potential with thousands of opportunities tailored to your skills and goals.
          Explore roles, submit applications effortlessly, and take the next step toward your future.
        </p>

        {/*Search Bar */}
        <div className='flex w-[25%] bg-white shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Land the Job You’ve Been Waiting For'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
      </div>
    </div>
  );
};

export default HeroSection;
