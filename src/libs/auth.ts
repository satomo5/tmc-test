import { DataUserType } from "../types/storage";
import { emailRegex, passwordRegex } from "./consts";
import { getStorageData, updateStorageData } from "./storage";

export function checkLogin(
  email: string,
  password: string
): {
  status: boolean;
  message_email?: string;
  message_password?: string;
  message?: string;
} {
  // ============== check input validation  ==============
  // check if email and password are not empty
  let messageError = {
    message_email: "",
    message_password: "",
  };

  if (!email || !password)
    messageError = {
      message_email: !email ? "Email are required" : "",
      message_password: !password ? "Password are required" : "",
    };

  // check if email is valid
  if (!emailRegex.test(email) && !messageError.message_email)
    messageError.message_email = "Invalid format Email";

  // check if password length is valid
  if (password.length < 6 && !messageError.message_password)
    messageError.message_password = "Password must be at least 6 characters";

  // check if password is valid
  if (!passwordRegex.test(password) && !messageError.message_password)
    messageError.message_password =
      "Invalid format Password (Password must have at least one uppercase letter, one lowercase letter, one number, and one special character)";

  if (messageError.message_email || messageError.message_password)
    return {
      status: false,
      ...messageError,
    };

  // ============== check user ==============
  const storageUser = getStorageData("users") as DataUserType[] | null;
  const newMemberMessage = (email: string) =>
    `Welcome new member, ${email}. You will be redirected to dashboard`;

  // create storage and treat as new user
  if (!storageUser) {
    updateStorageData("users", [
      {
        name: email,
        avatar: "/images/profile.png",
        email,
        password,
        type_auth: "email_password",
      },
    ]);

    updateStorageData("user", {
      name: email,
      avatar: "/images/profile.png",
      email,
      password,
      type_auth: "email_password",
    });

    return {
      status: true,
      message: newMemberMessage(email),
    };
  }

  // find user
  const foundUser = storageUser?.find((item) => item.email === email);

  // check if user exists
  if (!foundUser) {
    updateStorageData("users", [
      ...storageUser,
      {
        name: email,
        avatar: "/images/profile.png",
        email,
        password,
        type_auth: "email_password",
      },
    ]);

    updateStorageData("user", {
      name: email,
      avatar: "/images/profile.png",
      email,
      password,
      type_auth: "email_password",
    });

    return {
      status: true,
      message: newMemberMessage(email),
    };
  }

  // check if user is oauth2
  if (foundUser.type_auth !== "email_password")
    return {
      status: false,
      message: "User resgitered as oauth2. Please login user with Google.",
    };

  // check if password is correct
  if (foundUser.password !== password)
    return {
      status: false,
      message: "Incorrect Password",
    };

  // login success
  updateStorageData("user", {
    name: email,
    avatar: "/images/profile.png",
    email,
    password,
    type_auth: "email_password",
  });

  return {
    status: true,
    message: `Welcome ${email}, you will be redirected to dashboard`,
  };
}

export function checkLoginOauth(email: string, name: string, avatar: string) {
  const storageUser = getStorageData("users") as DataUserType[] | null;
  const newMemberMessage = (email: string) =>
    `Welcome new member, ${email}. You will be redirected to dashboard`;

  // create storage and treat as new user
  if (!storageUser) {
    updateStorageData("users", [
      {
        name: name,
        avatar: avatar,
        email,
        password: email,
        type_auth: "oauth2",
      },
    ]);

    updateStorageData("user", {
      name: name,
      avatar: avatar,
      email,
      password: email,
      type_auth: "oauth2",
    });

    return {
      status: true,
      message: newMemberMessage(email),
    };
  }

  // check if user exists
  const foundUser = storageUser?.find((item) => item.email === email);
  if (!foundUser) {
    console.log("first");
    updateStorageData("users", [
      ...storageUser,
      {
        name: name,
        avatar: avatar,
        email,
        password: email,
        type_auth: "oauth2",
      },
    ]);

    updateStorageData("user", {
      name: name,
      avatar: avatar,
      email,
      password: email,
      type_auth: "oauth2",
    });

    return {
      status: true,
      message: newMemberMessage(email),
    };
  }

  // check if user is oauth2
  if (foundUser.type_auth !== "oauth2")
    return {
      status: false,
      message:
        "User resgitered use email. Please login user with Email and Passowrd.",
    };

  // login success
  updateStorageData("user", {
    name: name,
    avatar: avatar,
    email,
    password: email,
    type_auth: "oauth2",
  });

  return {
    status: true,
    message: `Welcome ${name}, you will be redirected to dashboard`,
  };
}
