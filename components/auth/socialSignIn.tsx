"use client";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "@/lib/authClient";

export default function SocialSignIn({provider,children,}: {provider: Provider; children: React.ReactNode;}) {
    async function handleClick() {
      await signIn.social({
        provider,
        callbackURL: "/dashboard",
      });
    }
  return (
    <Button
      onClick={handleClick}
      type="button"
      variant={"outline"}
    >
      {children}
    </Button>
  );
}


type Provider = "github" | "apple" | "discord" | "facebook" | "google" | "microsoft" | 
"spotify" | "twitch" | "twitter" | "dropbox" | "linkedin" | "gitlab" | "tiktok" | "reddit" | 
"roblox" | "vk" | "kick";