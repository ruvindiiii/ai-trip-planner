"use client";
import Image from "next/image";
import { AutoComplete, Select } from "antd";
import { useEffect, useState } from "react";
import { getOptions } from "./api";
import { DatePicker, Space } from "antd";
import { MdOutlineSurfing } from "react-icons/md";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Button, Divider, Flex, Radio } from "antd";
import { generateTrip } from "./api";
import type { ConfigProviderProps } from "antd";
import { relative } from "path";
type SizeType = ConfigProviderProps["componentSize"];

export default function Home() {
  const [options, setOptions] = useState([
    { label: "sriLanka", value: 1 },
    { label: "Netherlands", value: 2 },
    { label: "America", value: 3 },
  ]);
  const [checkedStat, setCheckedStat] = useState<number[]>([1]);

  const handleSearch = async (text: string) => {
    let apiOptions = await getOptions(text);
    let predictionsArr = apiOptions.predictions.map((prediction: any) => {
      return { label: prediction.description, value: prediction.place_id };
    });
    setOptions(predictionsArr);
  };

  const vibes = [
    { name: "Romantic Getaway", src: "/logos/romantic.png", id: 1 },
    { name: "Adventure", src: "/logos/adventure.png", id: 2 },
    { name: "Night Life", src: "/logos/night-life.png", id: 3 },
    { name: "Foddie", src: "/logos/food.png", id: 4 },
    { name: "Historic", src: "/logos/historic-site.png", id: 5 },
    { name: "Winter Wonderland", src: "/logos/house.png", id: 6 },
    { name: "Wellness", src: "/logos/lotus.png", id: 7 },
    { name: "Road trip", src: "/logos/road-trip.png", id: 8 },
    { name: "Beach", src: "/logos/sun-umbrella.png", id: 9 },
    { name: "Wild Life", src: "/logos/wildlife.png", id: 10 },
  ];

  const [trips, setTrips] = useState([]);

  const handlechecked = (id: number, name: string) => {
    if (checkedStat.includes(id)) {
      let filteredCheckedStat = checkedStat.filter((elem) => {
        if (elem === id) {
          return false;
        }
        return true;
      });
      setCheckedStat(filteredCheckedStat);
    } else {
      setCheckedStat([...checkedStat, id]);
    }
  };

  const handleGenerateTrip = async () => {
    let checkedVibeNames = checkedStat.map((id) => {
      let vibe = vibes.find((vibe) => vibe.id === id);
      return vibe?.name;
    });

    let response = await generateTrip(checkedVibeNames);
    setTrips(response);
  };

  useEffect(() => {
    handleGenerateTrip();
  }, []);

  return (
    <div className="flex flex-col p-8 gap-6">
      <div
        id="site-header"
        className="flex flex-row w-full justify-between py-2"
      >
        <h1 className="text-xl text-black">Trip Planner</h1>
        <h2 className="text-lg text-black">Profile Icon</h2>
      </div>

      <div
        id="page-header"
        className="flex flex-row w-full gap-5 p-5 shadow-md rounded-lg"
      >
        <div className="flex flex-col gap-3 flex-1 text-black align-center justify-center">
          <div className="flex flex-row gap-10">
            <div className="w-[50%]">
              <h2 className="text-sm font-semibold">Where to?</h2>
              <AutoComplete
                className="w-[100%]"
                options={options}
                // onSelect={onSelect}
                onSearch={handleSearch}
                placeholder="input here"
              />
            </div>
            <div className="w-[50%]">
              <h2 className="text-sm font-bold">How many days?</h2>
              <Select className="w-[100%]">
                <Select.Option value="sample">Sample</Select.Option>
              </Select>
            </div>
          </div>
          <div className="flex flex-row gap-10 items-end">
            <div>
              <h2 className="text-sm font-bold">
                Pick the exact dates (optional)
              </h2>
              <DatePicker.RangePicker />
            </div>
            <Button
              size="middle"
              className="flex-end m-0"
              onClick={handleGenerateTrip}
            >
              Generate my trip
            </Button>
          </div>
        </div>
        <div className="w-[1px] bg-gray-200"></div>
        <div className="flex flex-col flex-1 grow text-black">
          <h2 className="text-sm font-bold">What's the vibe?</h2>
          <div className="flex flex-row flex-wrap gap-2">
            {vibes.map((vibe) => {
              return (
                <div
                  key={vibe.id}
                  className="shadow-sm bg-gray-100 flex justify-center items-center py-1 pl-2"
                  onClick={() => handlechecked(vibe.id, vibe.name)}
                >
                  <img src={vibe.src} className="h-[40px]"></img>
                  <span className="px-3">
                    {vibe.name}
                    {checkedStat.includes(vibe.id) && (
                      <i className="fa-solid fa-circle-check text-green-500 ml-2"></i>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4">
        {trips.map((trip) => {
          return (
            <div
              className=" h-[300px] shadow-sm bg-gray-100 flex justify-center items-center"
              style={{
                backgroundImage: `url(${trip.imageUrls[0].url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                style={{ position: "absolute", bottom: 10, left: 20 }}
                className="text-white text-xl font-bold"
              >
                {trip.location}
              </div>
            </div>
          );
        })}
      </div>
      <div id="body"></div>
    </div>
  );
}
