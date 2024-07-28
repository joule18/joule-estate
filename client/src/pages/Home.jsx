import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import ListingItem from "../components/ListingItem";

function Home() {
  SwiperCore.use([Navigation]);

  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get(`/api/listing/get?offer=true&limit=4`);
        const { data } = res;
        setOfferListings(data);
        fetchRent();
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message;
        console.log(errorMessage);
      }
    };
    const fetchRent = async () => {
      try {
        const res = await axios.get(`/api/listing/get?type=rent&limit=4`);
        const { data } = res;
        setRentListings(data);
        fetchSale();
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message;
        console.log(errorMessage);
      }
    };
    const fetchSale = async () => {
      try {
        const res = await axios.get(`/api/listing/get?type=sale&limit=4`);
        const { data } = res;
        setSaleListings(data);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message;
        console.log(errorMessage);
      }
    };
    fetchOffer();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Joule Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get started...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing results */}
      <div className="max-w-8xl p-3 mx-auto flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="w-full">
            <div className="ms-20 my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="justify-center w-full flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="w-full">
            <div className="ms-20 my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more rentals
              </Link>
            </div>
            <div className="justify-center w-full flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="w-full">
            <div className="ms-20 my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="justify-center w-full flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
