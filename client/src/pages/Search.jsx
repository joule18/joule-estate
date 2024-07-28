import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ListingItem from "../components/ListingItem";

function Search() {
  const navigate = useNavigate();

  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const handleChange = (e) => {
    const { id } = e.target;
    if (id === "all" || id === "rent" || id === "sale") {
      setSidebarData((prevSideBar) => ({
        ...prevSideBar,
        type: id,
      }));
    }
    if (id === "searchTerm") {
      setSidebarData((prevSideBar) => ({
        ...prevSideBar,
        searchTerm: e.target.value,
      }));
    }
    if (id === "parking" || id === "furnished" || id === "offer") {
      setSidebarData((prevSideBar) => ({
        ...prevSideBar,
        [id]: e.target.checked || e.target.checked === "true" ? true : false,
      }));
    }
    if (id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData((prevSideBar) => ({
        ...prevSideBar,
        sort,
        order,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlSearchTerm = urlParams.get("searchTerm");
    const urlType = urlParams.get("type");
    const urlParking = urlParams.get("parking");
    const urlFurnished = urlParams.get("furnished");
    const urlOffer = urlParams.get("offer");
    const urlSort = urlParams.get("sort");
    const urlOrder = urlParams.get("order");

    if (
      urlSearchTerm ||
      urlType ||
      urlParking ||
      urlFurnished ||
      urlOffer ||
      urlSort ||
      urlOrder
    ) {
      setSidebarData({
        searchTerm: urlSearchTerm || "",
        type: urlType || "all",
        parking: urlParking === "true" ? true : false,
        furnished: urlFurnished === "true" ? true : false,
        offer: urlOffer === "true" ? true : false,
        sort: urlSort || "createdAt",
        order: urlOrder || "desc",
      });
    }
    const fetchListings = async () => {
      setShowMore(false);
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`/api/listing/get?${searchQuery}`);
        const { data } = res;
        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
        setListings(data);
        setLoading(false);
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message;
        console.log(errorMessage);
        setLoading(false);
      }
    };
    fetchListings();
  }, [location.search]);

  const handleShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    try {
      const res = await axios.get(`/api/listing/get?${searchQuery}`);
      const { data } = res;
      if (data.length < 9) {
        setShowMore(false);
      }
      setListings([...listings, ...data]);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      console.log(errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={sidebarData.type === "all"}
                onChange={handleChange}
              />
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
              />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
              />
              <span className="">Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={sidebarData.offer}
                onChange={handleChange}
              />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className=" font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                checked={sidebarData.parking}
                onChange={handleChange}
              />
              <span className="">Parking Lot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={sidebarData.furnished}
                onChange={handleChange}
              />
              <span className="">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className=" font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              default={"createdAt_desc"}
              className="border rounded-lg p-2"
              id="sort_order"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="uppercase hover:opacity-95 bg-slate-700 text-white p-3 rounded-lg">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:{" "}
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found.</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              className="text-green-700 hover:underline text-center w-full"
              onClick={handleShowMoreClick}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Search;
