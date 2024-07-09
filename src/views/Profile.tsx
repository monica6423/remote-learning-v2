// ProfileComponent.tsx

import React, { useEffect } from 'react';
import UserCard from '../components/UserCard';
import ProfileItem from '../components/ProfileItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  getCurrentProfileToEdit,
  getProfiles,
  getProfilesLoad,
} from '../redux/profileSlice';
import { RootState } from '../redux/rootReducer'; // Adjust the path as per your project structure
import { AppDispatch } from '../redux/store';

function ProfileComponent() {
  const dispatch: AppDispatch = useDispatch();
  const { profiles, loading } = useSelector(
    (state: RootState) => state.profile
  );

  console.log("loading",loading)
  console.log("profiles",profiles)

  useEffect(() => {
    dispatch(getCurrentProfile());
    dispatch(getProfiles());
  }, [dispatch]);

  // Example of dispatching getCurrentProfileToEdit
  const handleGetProfileToEdit = () => {
    dispatch(getCurrentProfileToEdit());
  };

  // Example of dispatching getProfilesLoad with variables
  const handleGetProfilesLoad = () => {
    const variables = { loadMore: true }; // Adjust based on your needs
    dispatch(getProfilesLoad(variables));
  };

  return (
    <div>
      profile
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {profiles.map((profile) => {
          return <ProfileItem key={profile._id} profile={profile} />;
        })}
      </div>
    </div>
  );
}

export default ProfileComponent;
