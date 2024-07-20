// Menubar.jsx
import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Home from "../../assets/icons/Home.svg";
import HomeSolid from "../../assets/icons/Home-Solid.svg";
import Chat from "../../assets/icons/Chat.svg";
import ChatSolid from "../../assets/icons/Chat-Solid.svg";
import Tracker from "../../assets/icons/Tracker.svg";
import TrackerSolid from "../../assets/icons/Tracker-Solid.svg";
import Friends from "../../assets/icons/Friends.svg";
import FriendsSolid from "../../assets/icons/Friends-Solid.svg";
import Settings from "../../assets/icons/Settings.svg";
import SettingsSolid from "../../assets/icons/Settings-Solid.svg";

export default function Menubar() {
  const NavContainer = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 430px;
    margin: 0 auto;
    height: 6vh;
    background-color: #fff;
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
  `;

  const NavWrap = styled.div`
    width: 20%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  `;

  const NavIconImg = styled.img`
    width: 28px;
    height: 28px;
  `;

  const locationNow = useLocation();

  if (
    locationNow.pathname === "/" ||
    locationNow.pathname === "/chat" ||
    locationNow.pathname === "/tracker" ||
    locationNow.pathname === "/friends" ||
    locationNow.pathname === "/settings"
  ) {
    return (
      <NavContainer>
        <Link to="/">
          <NavWrap>
            {locationNow.pathname === "/" ? (
              <NavIconImg src={HomeSolid} />
            ) : (
              <NavIconImg src={Home} />
            )}
          </NavWrap>
        </Link>
        <Link to="/chat">
          <NavWrap>
            {locationNow.pathname === "/chat" ? (
              <NavIconImg src={ChatSolid} />
            ) : (
              <NavIconImg src={Chat} />
            )}
          </NavWrap>
        </Link>
        <Link to="/tracker">
          <NavWrap>
            <NavWrap>
              {locationNow.pathname === "/tracker" ? (
                <NavIconImg src={TrackerSolid} />
              ) : (
                <NavIconImg src={Tracker} />
              )}
            </NavWrap>
          </NavWrap>
        </Link>
        <Link to="/friends">
          <NavWrap>
            <NavWrap>
              {locationNow.pathname === "/friends" ? (
                <NavIconImg src={FriendsSolid} />
              ) : (
                <NavIconImg src={Friends} />
              )}
            </NavWrap>
          </NavWrap>
        </Link>
        <Link to="/settings">
          <NavWrap>
            <NavWrap>
              {locationNow.pathname === "/settings" ? (
                <NavIconImg src={SettingsSolid} />
              ) : (
                <NavIconImg src={Settings} />
              )}
            </NavWrap>
          </NavWrap>
        </Link>
      </NavContainer>
    );
  } else {
    return null;
  }
}
