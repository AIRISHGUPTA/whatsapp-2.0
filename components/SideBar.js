import React from "react";
import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import MoreVerticon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth, db } from "../firebase";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  height: 80px;
  z-index: 1;
  padding: 10px;
  border-bottom: 2px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const Search = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot, loading] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Please enter an email address.");
    if (!input) {
      return null;
    }

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExits(input) &&
      user.email !== input
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExits = (recipentEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) => chat.data().find((user) => user === recipentEmail)?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVerticon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chat" />
      </Search>
      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
      {chatsSnapshot?.doc.map((chat) => (
        <Chat key={chat.id} user={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;
