function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Description"
            id="description"
            required
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            placeholder="Address"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span className="">Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span className="">Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span className="">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap flex-col gap-6">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="p-3 border rounded-lg"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="p-3 border rounded-lg"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                />
                <p>Baths</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="p-3 border rounded-lg"
                  id="regularPrice"
                  min="1"
                  max="10"
                  required
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="p-3 border rounded-lg"
                  id="discountPrice"
                  min="1"
                  max="10"
                  required
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              className="p-3 border border-gray-400 rounded w-full"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
export default CreateListing;
