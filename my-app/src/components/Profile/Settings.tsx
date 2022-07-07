import React from "react";
import TextInput from "./TextInput";
import { Heading } from "@chakra-ui/react";
import ProfileWrapper from "./ProfileWrapper";

interface SettingsProps {
  title: string;
  subtitle: string;
  handleSubmit: any;
  handleChange: (e: React.SyntheticEvent<EventTarget>, type: string) => void;
  emailDetails: { currentEmail: string; newEmail: string };
  passwordDetails: {
    currentPassword: string;
    newPassword: string;
  };
  userLoading: {
    val: boolean;
    type: "string";
  };
}

export default function Settings({
  title,
  subtitle,
  handleSubmit,
  handleChange,
  emailDetails,
  passwordDetails,
  userLoading,
}: SettingsProps) {
  const dataArr = [
    {
      id: "currentEmail",
      placeholder: "Enter your current email...",
      title: "Current Email",
      value: emailDetails.currentEmail,
    },
    {
      id: "newEmail",
      placeholder: "Enter your new email...",
      title: "New Email",
      value: emailDetails.newEmail,
    },
  ];

  const passwordData = [
    {
      id: "currentPassword",
      placeholder: "Enter your current password...",
      title: "Current Password",
      value: passwordDetails.currentPassword,
    },
    {
      id: "newPassword",
      placeholder: "Enter your new password...",
      title: "New Password",
      value: passwordDetails.newPassword,
    },
  ];
  console.log("Password details", passwordDetails.newPassword);

  const HeadingTitle = ({ children }) => {
    return (
      <Heading mt={5} mb={5} size="xs">
        {children}
      </Heading>
    );
  };

  return (
    <>
      <ProfileWrapper
        handleSubmit={handleSubmit}
        title={title}
        type={"emailDetails"}
        loadingType={"email"}
        subtitle={subtitle}
        loading={userLoading}
      >
        <HeadingTitle>Update your Email Address</HeadingTitle>
        {dataArr.map((data) => (
          <TextInput
            key={data.id}
            id={data.id}
            type={"emailDetails"}
            handleChange={handleChange}
            placeholder={data.placeholder}
            title={data.title}
            value={data.value}
          />
        ))}
      </ProfileWrapper>
      <ProfileWrapper
        loadingType={"password"}
        loading={userLoading}
        type={"passwordDetails"}
        handleSubmit={handleSubmit}
        title={""}
        subtitle={""}
      >
        <HeadingTitle>Update your Email Password</HeadingTitle>
        {passwordData.map((data) => (
          <TextInput
            key={data.id}
            type={"passwordDetails"}
            id={data.id}
            handleChange={handleChange}
            placeholder={data.placeholder}
            title={data.title}
            value={data.value}
          />
        ))}
      </ProfileWrapper>
    </>
  );
}
