"use client";

import {
  ArrowLeft,
  Layout,
  PhoneCall,
  Users2,
  Code2,
  Mail,
  TwitchIcon,
  LucideTwitch,
  Lock,
  Calendar,
} from "lucide-react";
import {
  DiscordLogoIcon,
  GitHubLogoIcon,
  TwitterLogoIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ComponentRender } from "./renderer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CodeComponent } from "./code-display";
import { Icons } from "@/components/icons";
import { useComponents } from "@/lib/store/component";
import { useEffect } from "react";
import { authOptions } from "./lib/auth-options";
export function AuthBuilder() {
  const { enabledComp, updateEnabledComponent } = useComponents();
  useEffect(() => {
    console.log({ enabledComp });
  }, [enabledComp]);
  const forgetPass = enabledComp.additionals.forgetPassword?.visiblity;
  useEffect(() => {}, [forgetPass]);
  return (
    <Card className="relative h-full w-full bg-transparent max-w-7xl mx-auto rounded-none">
      <div className="w-full  border-b-2 border-gray-200/50 dark:border-gray-900/50">
        <div className="overflow-hidden md:ml-[-2px] bg-transparent flex gap-10 items-center justify-between md:justify-normal  rounded-none">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className=" md:ml-[-5px] data-[state=active]:bg-background items-center justify-between md:justify-normal bg-tranparent gap-3 w-full md:w-fit  rounded-none">
              <TabsTrigger
                className="rounded-none py-2 pt-4  data-[state=active]:text-white flex  items-center gap-2 data-[state=active]:bg-stone-900 "
                value="preview"
                onClick={() => {
                  // setIsPrev(true);
                  // setActiveTab("preview");
                }}
              >
                <Layout className="w-4 h-4" />
                <span className="py-1 flex items-center justify-center">
                  Preview
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsList className=" md:ml-[-5px] data-[state=active]:bg-background items-center justify-between md:justify-normal bg-tranparent gap-3 w-full md:w-fit  rounded-none">
              <TabsTrigger
                className="rounded-none py-2 pt-2 data-[state=active]:text-white flex  items-center gap-2 data-[state=active]:bg-stone-900 "
                value="code"
                onClick={() => {
                  // setIsPrev(true);
                  // setActiveTab("preview");
                }}
              >
                <Code2 className="w-4 h-4" />
                <span className="py-1 flex items-center justify-center">
                  Code
                </span>
              </TabsTrigger>
            </TabsList>
            <hr className="bg-gray-200 mt-1" />
            <TabsContent value="code" className="w-full">
              <CodeComponent />
            </TabsContent>
            <TabsContent value="preview" className="w-full -mt-1">
              <div className="">
                <div className="container mx-auto grid md:flex items-start gap-14 max-w-7xl">
                  <ComponentRender />
                  {/* <div>
                    <div className="h-screen w-[1px] bg-input" />
                  </div> */}
                  <div className="relative max-w-[35%] mx-auto pt-20 px-10">
                    <div className="absolute h-screen ml-1 mt-1 w-full pointer-events-none inset-0 flex items-center justify-center dark:bg-stone-900 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-2xl font-semibold mb-1">
                          Build you own{" "}
                          <span className="font-mono">{"<SignIn />"} </span>{" "}
                          Component.
                        </h1>
                        <p className="text-sm text-muted-foreground">
                          You can configure anything you want for build your
                          auth ui by toggling the peices you want.
                        </p>
                      </div>
                      <hr className="bg-black/20 dark:bg-white/90" />
                      <div className="space-y-4">
                        <div className="h-[400px] flex flex-col gap-10 overflow-y-auto">
                          <div className="space-y-4 ">
                            <Label className="font-mono text-gray-200 uppercase block mt-4">
                              Credential Login
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["credentials"]).map(
                                (cred, indx) => {
                                  return (
                                    <div
                                      key={indx}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        {
                                          authOptions["credential"][cred][
                                            "icon"
                                          ]
                                        }
                                        <span className="text-sm">
                                          {
                                            authOptions["credential"][
                                              cred as string
                                            ].name
                                          }
                                        </span>
                                      </div>
                                      <Switch
                                        onCheckedChange={(e) => {
                                          updateEnabledComponent({
                                            toogledComp: {
                                              credentials: {
                                                ...enabledComp["credentials"],
                                                [cred]: e,
                                              },
                                            },
                                          });
                                        }}
                                        checked={
                                          enabledComp["credentials"][cred]
                                        }
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                          <div className="space-y-4 ">
                            <Label className="font-mono text-gray-200 uppercase block mt-4">
                              Additional Credential
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["additionals"]).map(
                                (addition, indx) => {
                                  const exists =
                                    addition in authOptions["additionals"];
                                  const enabledCredentials = Object.entries(
                                    enabledComp.credentials,
                                  )
                                    .filter((curr) => curr[1])
                                    .map((curr) => curr[0]);
                                  const fullDeps =
                                    enabledComp.additionals[addition][
                                      "dependencies"
                                    ];
                                  const disabled = enabledCredentials.filter(
                                    (curr) => fullDeps?.includes(curr),
                                  );
                                  console.log({ addition, exists });
                                  if (exists) {
                                    return (
                                      <div
                                        key={indx}
                                        className="flex items-center justify-between"
                                      >
                                        <div className="flex items-center gap-2">
                                          {
                                            authOptions["additionals"][addition]
                                              .icon
                                          }
                                          <span className="text-sm">
                                            {
                                              authOptions["additionals"][
                                                addition as string
                                              ].name
                                            }
                                          </span>
                                        </div>
                                        <Switch
                                          // disabled={!disabled.length}
                                          onCheckedChange={(e) => {
                                            updateEnabledComponent({
                                              toogledComp: {
                                                additionals: {
                                                  ...enabledComp["additionals"],
                                                  [addition]: {
                                                    ...enabledComp[
                                                      "additionals"
                                                    ][addition],
                                                    visiblity: e,
                                                    routing: false,
                                                  },
                                                },
                                              },
                                            });
                                          }}
                                          checked={
                                            enabledComp["additionals"][addition]
                                              .visiblity
                                          }
                                        />
                                      </div>
                                    );
                                  }
                                },
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label className="mb-4 font-mono text-gray-200 uppercase block mt-4">
                              Other Sign In Options
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["otherSignIn"]).map(
                                (other, indx) => {
                                  return (
                                    <div
                                      key={indx}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        {
                                          authOptions["otherSignIn"][other][
                                            "icon"
                                          ]
                                        }
                                        <span className="text-sm">
                                          {
                                            authOptions["otherSignIn"][
                                              other as string
                                            ].name
                                          }
                                        </span>
                                      </div>
                                      <Switch
                                        onCheckedChange={(e) => {
                                          updateEnabledComponent({
                                            toogledComp: {
                                              otherSignIn: {
                                                ...enabledComp["otherSignIn"],
                                                [other]: e,
                                              },
                                            },
                                          });
                                        }}
                                        checked={
                                          enabledComp["otherSignIn"][other]
                                        }
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <Label className="mb-4 font-mono text-gray-200 uppercase block mt-4">
                              Social Providers
                            </Label>
                            <hr className="text-gray-300" />
                            <div className="pr-4 space-y-4">
                              {Object.keys(enabledComp["socials"]).map(
                                (social, indx) => {
                                  return (
                                    <div
                                      key={indx}
                                      className="flex items-center justify-between"
                                    >
                                      <div className="flex items-center gap-2">
                                        {
                                          authOptions["socialProviders"][
                                            social
                                          ]["icon"]
                                        }
                                        <span className="text-sm">
                                          {
                                            authOptions["socialProviders"][
                                              social as string
                                            ].name
                                          }
                                        </span>
                                      </div>
                                      <Switch
                                        onCheckedChange={(e) => {
                                          updateEnabledComponent({
                                            toogledComp: {
                                              socials: {
                                                ...enabledComp["socials"],
                                                [social]: e,
                                              },
                                            },
                                          });
                                        }}
                                        checked={enabledComp["socials"][social]}
                                      />
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
}