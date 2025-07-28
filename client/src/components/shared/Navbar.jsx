import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import logo from '../../assets/job-seeker.png';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className={`fixed top-0 left-0 w-full transition-all duration-300 z-50 
      ${location.pathname === '/' 
        ? (isScrolled ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-white') 
        : 'bg-white text-gray-800 shadow-md'}
      px-4 py-5 md:py-6`}>
      
      <div className='flex items-center justify-between mx-auto max-w-7xl'>

        {/* Logo */}
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <Link to="/" className='flex items-center gap-2 text-2xl font-bold'>
            <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
            <span>Pro<span className='text-[#F83002]'>Connect.io</span></span>
          </Link>

          {/* Hamburger Toggle */}
          <div className='lg:hidden'>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
            </Button>
          </div>
        </div>

        {/* Nav Links - Desktop */}
        <div className='hidden lg:flex items-center gap-8'>
          <ul className='flex font-medium items-center gap-5'>
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className=''>
                  <div className='flex gap-2 space-y-2'>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="User Avatar" />
                    </Avatar>
                    <div>
                      <h4 className='font-medium'>{user?.fullname}</h4>
                      <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className='flex flex-col my-2 text-gray-600'>
                    {user?.role === 'student' && (
                      <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        <User2 />
                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                      </div>
                    )}
                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Nav Links - Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className='lg:hidden mt-3 px-2 bg-white rounded shadow text-gray-800'>
          <ul className='flex flex-col font-medium gap-4 py-4'>
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className='flex flex-col gap-2 pb-4'>
              <Link to="/login"><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button></Link>
              <Link to="/signup"><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
            </div>
          ) : (
            <div className='flex flex-col gap-3 px-2 pb-4 text-sm'>
              {user?.role === 'student' && (
                <Link to="/profile" className='flex items-center gap-2'><User2 size={18} /> View Profile</Link>
              )}
              <button onClick={logoutHandler} className='flex items-center gap-2 text-left'><LogOut size={18} /> Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
