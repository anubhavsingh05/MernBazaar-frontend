import { useState } from "react"
import { useForm } from "react-hook-form"
import { VscSettings } from "react-icons/vsc"
import SearchBar, { searchValues } from "../../../components/searchBar"
import { filterStore, searchObjectType } from "../../../Store/ClientStore/store-Filters"
import RangeSlider_Dark from "../../../components/RangeSlider_Dark"
import { defaultValues, priceRange, sortingBadges } from "@/Store/ClientStore/store-Constants"



function MobileFilters() {

  const { searchObject, setSearchObject,
          resetBadgeToken, setResetBadgeToken } = filterStore()
  const [price, setPrice] = useState<number[] | null>(defaultValues.price)
  const [openFilter, setOpenFilter] = useState(false)
  const {register, handleSubmit, reset, formState:{ isDirty }} = useForm()
  const [isDirtyPrice, setIsDirtyPrice] = useState(false)


  const toggleFilterBox = () => {
    setOpenFilter(prev => !prev)
    window.scrollTo({top: 0})
    const scrollStyle = window.document.body.style.overflow
    if (!scrollStyle || scrollStyle === "visible") {
      window.document.body.style.overflow = "hidden"
    } else {
      window.document.body.style.overflow = "visible"
    }
}

  const handleSearch = (value: searchValues) => {
    setSearchObject({...defaultValues, keyword:value.search})
    setOpenFilter(false)
    setIsDirtyPrice(false)
    reset()
    setResetBadgeToken()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const onFilterSubmit = (data: any) => {
    toggleFilterBox()

    let filteredObject = {}
    Object.keys(data).map(key => {
      const value = data[key as keyof searchObjectType]
      if (value !== "") {
        filteredObject = { ...filteredObject, [key]: data[key] }
      }
    })
    setSearchObject({...searchObject,...filteredObject, price})
  }
  const clearFilters = () => {
    toggleFilterBox()
    window.scrollTo({ top: 0, behavior: "smooth" })
    setSearchObject({...defaultValues, keyword:searchObject.keyword})
    reset()
    setResetBadgeToken()
    setIsDirtyPrice(false)
  }
  const handlePrice = (price: number[]) => {
    setPrice(price)
    setIsDirtyPrice(true)
  }

  return (
    <>
      <div
        className={`h-10 pl-4 xs:h-14 xs:mt-2 bg-slate-600 flex items-center gap-x-4 sm:hidden sticky xxs:top-14 xs:top-16 z-10 min-w-0 depthShadow`}>

        <button
          className="w-1/4 px-6 self-stretch flex justify-center items-center gap-x-2 font-bold xs:text-lg text-base rounded-md focus:bg-slate-700 focus-within:shadow-md text-slate-200 transition-colors duration-100 pl-4"
          onClick={toggleFilterBox}>
          <span>
            <VscSettings />
          </span>
          Filters
        </button>

        <div className={`grow min-w-0 pr-2 xs:pr-4 bg-slate-600 rounded-lg self-stretch flex justify-center items-center`}>
          <SearchBar
            onSearch={handleSearch}
            placeHolder="Search Products"
          />
        </div>
      </div>

      <div className={`${ openFilter ? 'filtersOpen' : 'filtersClose'} bg-orange-200 flex justify-center items-center origin-top sticky xs:top-[7.5rem] z-10 sm:hidden`}>
        <form className="p-8 flex flex-col grow items-end gap-y-2 bg-slate-500 min-w-0"
          onSubmit={handleSubmit(onFilterSubmit)}
          noValidate>
          <label 
            htmlFor="category"
            className="self-stretch flex items-center justify-between py-2 px-4 xs:text-xl text-base bg-slate-600 font-bold text-slate-200 ">
            Category
            <select 
              id="category" 
              {...register("category")}
              className={`xs:w-64 w-36 rounded-lg text-white text-sm font-bold bg-slate-600 self-stretch px-2 min-w-0`}
              defaultValue={""}>
              <option value={""} disabled> Select</option>
              <option value={"Menswear"}>Menswear</option>
              <option value={"Womenswear"}>Womenswear</option>
              <option value={"Phones"}>Phones</option>
              <option value={"Laptops"}>Laptops</option>
              <option value={"Watches"}>Watches</option>
              <option value={"Furniture"}>Furniture</option>
              <option value={"Toys"}>Toys</option>
              <option value={"Pets"}>Pets & Pet Supplies</option>
              <option value={"Books"}>Books</option>
              <option value={"Beauty"}>Beauty & Personal Care</option>
              <option value={"Groceries"}>Groceries</option>
              <option value={"Medicines"}>Medicines</option>
              <option value={"Gym"}>Gym Equipments</option>
            </select>
          </label>

          <label
            htmlFor="ratings"
            className="self-stretch flex items-center justify-between py-2 px-4 xs:text-xl text-base bg-slate-600 font-bold text-slate-200">
            Ratings
            <select
              id="ratings"
              {...register("ratings")}
              className={`xs:w-64 w-36 rounded-lg text-white text-sm font-bold bg-slate-600 self-stretch px-2`}
              defaultValue={""}>
              <option value={""} disabled> Select</option>
              <option value={"4"}>4 ★ and above</option>
              <option value={"3"}>3 ★ and above</option>
              <option value={"2"}>2 ★ and above</option>
              <option value={"1"}>1 ★ and above</option>
            </select>
          </label>

          <label
            htmlFor="discount"
            className="self-stretch flex items-center justify-between py-2 px-4 xs:text-xl text-base bg-slate-600 font-bold text-slate-200">
            Ratings
            <select
              id="discount"
              {...register("discount")}
              className={`xs:w-64 w-36 rounded-lg text-white text-sm font-bold bg-slate-600 self-stretch px-2`}
              defaultValue={""}>
              <option value={""} disabled> Select</option>
              <option value={"50"}>50% off</option>
              <option value={"40"}>40% off</option>
              <option value={"30"}>30% off</option>
              <option value={"20"}>20% off</option>
            </select>
          </label>

          <label
            htmlFor="sort"
            className="self-stretch flex items-center justify-between py-2 px-4 xs:text-xl text-base bg-slate-600 font-bold text-slate-200">
            Sort By
            <select
              id="sort"
              {...register("sort")}
              className={`xs:w-64 w-36 rounded-lg text-white text-sm font-bold bg-slate-600 self-stretch px-2`}
              defaultValue={""}>
              <option
                value={""}
                disabled>
                Select
              </option>
              <option value={sortingBadges.values[0]}>Price: low to high</option>
              <option value={sortingBadges.values[1]}>Price: high to low</option>
              <option value={sortingBadges.values[2]}>Ratings: low to high</option>
              <option value={sortingBadges.values[3]}>Ratings: high to low</option>
              <option value={sortingBadges.values[4]}>latest</option>
            </select>
          </label>

          <label
            htmlFor="price"
            className="self-stretch flex flex-col items-start gap-y-2 pt-2 pb-4 px-4 xs:text-xl text-base bg-slate-600 font-bold text-slate-200">
            Price
            <RangeSlider_Dark
              defaultValue={defaultValues.price? defaultValues.price : [0,priceRange.max]}
              max={priceRange.max}
              min={priceRange.min}
              step={priceRange.step}
              onValueCommit={handlePrice}
              resetBadgeToken={resetBadgeToken}
            />
          </label>

          <div className={`flex gap-x-2`}>
            <button
              className={`bg-slate-600 text-white font-semibold mt-1 text-sm xs:text-lg py-2 px-8 rounded-md hover:text-white shadow-md active:text-slate-300 active:shadow- transition-colors duration-100 ${
                isDirtyPrice || isDirty ? "opacity-100" : "opacity-50"
              }`}
              type="reset"
              onClick={clearFilters}
              disabled={!isDirtyPrice && !isDirty}>
              Clear
            </button>
            <button
              className={`bg-slate-600 text-white font-semibold mt-1 text-sm xs:text-lg py-2 px-8 rounded-md hover:text-white shadow-md active:text-slate-300 active:shadow- transition-colors duration-100 ${
                isDirtyPrice || isDirty ? "opacity-100" : "opacity-50"
              }`}
              disabled={!isDirtyPrice && !isDirty}>
              Apply
            </button>
          </div>
          <div className={`h-screen bg-slate-500 w-full`} />
        </form>
      </div>
    </>
  )
}

export default MobileFilters

// it would gave empty string if we never modified it thats
// why we had used !scrollStyle, but still if u want to get
// the real value no matter what then you can use:
// const bodyComputedStyle = window.getComputedStyle(document.body);
// const boka = bodyComputedStyle.overflow;
