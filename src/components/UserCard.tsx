import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import Spinner from '../assets/Spinner.svg';

const UserCard = ({ user }: { user: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false); // Set loading state to false once image has loaded
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        sx={{ height: 200 }}
        image={!isLoading ? user.photo : Spinner}
        alt="Dog"
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.user.name}
        </Typography>
        <Link to={`/details/${user.user._id}`}>
          <Button id="detail-btn" size="small" color="primary">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserCard;
