import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import MainCard from "../components/MainCard.styled";
import useAuthContext from "../AuthContext";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { IUserData } from "../../types/user";

const MainViewCard = () => {
  const { authData, removeAuthData } = useAuthContext();

  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    if (authData) {
      const getUserData = async () => {
        try {
          const res = await axios.get<IUserData>("/identity/getUser", {
            headers: {
              Authorization: `Bearer ${authData?.accessToken}`,
            },
          });

          setUserData(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUserData();
    }
  }, [authData]);

  const handleLogout = () => {
    setUserData(null);
    removeAuthData();
  };

  return (
    <MainCard>
      <TopBar userData={userData} logout={handleLogout}/>
      <Outlet context={userData} />
    </MainCard>
  );
};

export default MainViewCard;
