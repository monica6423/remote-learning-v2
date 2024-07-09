import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSpring, animated } from '@react-spring/web';
import { styled } from '@mui/material/styles';
// import { ViewButton } from '../layout/ViewButton';

interface Profile {
  _id: string;
  user: any;
  avatar?: string | null;
  status: string;
  company?: string | null;
  location: string;
  skills: string[];
  interests: string;
  photo: string;
}

interface ProfileCardProps {
  profile: Profile;
}

const interestLabels: Record<string, string> = {
  '1': 'Coding',
  '2': 'Finance',
  '3': 'Language',
  '4': 'Chemistry',
  '5': 'Art',
};

const AnimatedDiv = styled(animated.div)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  backgroundColor: '#2196f3',
  color: '#fff',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transform: 'rotate(-15deg)',
  transition: 'transform 0.3s ease-in-out',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const SkillsList = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  padding: 0,
  listStyle: 'none',
  marginTop: theme.spacing(1),
}));

const SkillItem = styled('li')(({ theme }) => ({
  backgroundColor: '#f0f0f0',
  color: '#333',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5, 1),
  margin: theme.spacing(0.5),
}));

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const [active, setActive] = useState(false);

  const spin = useSpring({
    config: { friction: 5 },
    transform: active ? 'rotate(-15deg)' : 'rotate(0deg)',
  });

  const { _id, user, status, location, skills, interests, photo } = profile;

  const handleMouseOver = () => {
    setActive(true);
  };

  const handleMouseOut = () => {
    setActive(false);
  };

  return (
    <StyledCard onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <animated.div style={spin} className="ribbon-label font-bold bg-blue-400 text-white absolute py-2 px-2">
        {interestLabels[interests]}
      </animated.div>
      <CardHeader title={user.name} subheader={status} />
      <CardMedia>
      <img src={photo} alt="" className="object-cover rounded-full w-24 h-24" />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <LocationOnIcon /> {location}
        </Typography>
        <ul className=''>
          {skills.slice(0, 4).map((skill, index) => (
            <SkillItem key={index}>{skill}</SkillItem>
          ))}
        </ul>
      </CardContent>
      <Link to={`/profile/${_id}`}>
        {/* <ViewButton text="View" /> */}
      </Link>
    </StyledCard>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    status: PropTypes.string.isRequired,
    company: PropTypes.string,
    location: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    interests: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
