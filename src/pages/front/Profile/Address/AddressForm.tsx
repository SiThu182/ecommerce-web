import React, { useEffect, useState, useMemo } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Select from "react-select";
import locationData from "@/data/locationData.json";
import BasicInput from "@/components/common/FormComponents/BasicInput";
import { AddressData } from "@/api/axiosClient";

// Type definitions for location data
interface DistrictData {
  "sub-districts": string[];
  "postal-code": string[];
}

interface ProvinceData {
  districts: {
    [key: string]: DistrictData;
  };
}

interface CountryData {
  dial_code: string;
  provinces: {
    [key: string]: ProvinceData;
  };
}

interface LocationData {
  [key: string]: CountryData;
}

// Cast the imported JSON data to our type
const typedLocationData = locationData as unknown as LocationData;

interface AddressFormProps {
  setAddressData: (data: AddressData) => void;
  defaultAddress?: AddressData;
}

interface Option {
  value: string;
  label: string;
  postalCode?: string;
  dialCode?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  setAddressData,
  defaultAddress = null,
}) => {
  // Helper functions
  console.log(defaultAddress, "Address");
  const getCountryOptions = useMemo(() => {
    return Object.entries(typedLocationData).map(([country, data]) => ({
      value: country,
      label: `${country.charAt(0).toUpperCase() + country.slice(1)} (${
        data.dial_code
      })`,
      dialCode: data.dial_code,
    }));
  }, []);

  const getDefaultCountry = () => {
    if (defaultAddress?.country) {
      const found = getCountryOptions.find(
        (opt) => opt.value === defaultAddress.country
      );
      return found || getCountryOptions[0];
    }
    return getCountryOptions[0];
  };

  // Parse phone number to remove country code if present
  const getSanitizedPhoneNumber = (phone: string, dialCode: string) => {
    const escapedDialCode = dialCode.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`^\\s*${escapedDialCode}\\s*`);
    return phone.replace(regex, "");
  };

  const defaultPhone = defaultAddress?.phone_no
    ? getSanitizedPhoneNumber(
        defaultAddress.phone_no,
        getDefaultCountry().dialCode
      )
    : "";

  const methods = useForm({
    defaultValues: {
      name: defaultAddress?.name || "",
      phone: defaultPhone,
      address: defaultAddress?.address || "",
      postalCode: defaultAddress?.postal_code || "",
      note: defaultAddress?.note || "",
      isActive: defaultAddress?.isActive || false,
      country: defaultAddress?.country || getCountryOptions[0].value,
      province: defaultAddress?.province || "",
      district: defaultAddress?.district || "",
      subdistrict: defaultAddress?.subDistrict || "",
      addressID: defaultAddress?.id || null,
    },
    mode: "onChange",
  });

  const { control, setValue, watch, resetField, formState } = methods;
  const { errors } = formState;
  const [selectedCountry, setSelectedCountry] = useState<Option>(
    getDefaultCountry()
  );
  const [provincesOptions, setProvincesOptions] = useState<Option[]>([]);
  const [districtsOptions, setDistrictsOptions] = useState<Option[]>([]);
  const [subdistrictsOptions, setSubdistrictsOptions] = useState<Option[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Option | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<Option | null>(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<Option | null>(
    null
  );
  const [isLoading, setIsLoading] = useState({
    provinces: false,
    districts: false,
    subdistricts: false,
  });

  // Initialize form with default address data
  useEffect(() => {
    const initializeForm = async () => {
      setIsLoading({ provinces: true, districts: true, subdistricts: true });

      try {
        const countryData = typedLocationData[selectedCountry.value];
        if (countryData) {
          // Initialize provinces
          const provinceOptions = Object.keys(countryData.provinces).map(
            (province) => ({
              value: province,
              label: province,
            })
          );
          setProvincesOptions(provinceOptions);
          setIsLoading((prev) => ({ ...prev, provinces: false }));

          // Set selected province if exists
          if (
            defaultAddress?.province &&
            countryData.provinces[defaultAddress.province]
          ) {
            const provinceOption = provinceOptions.find(
              (p) => p.value === defaultAddress.province
            );
            setSelectedProvince(provinceOption || null);

            // Initialize districts if province exists
            const districts =
              countryData.provinces[defaultAddress.province].districts;
            const districtOptions = Object.keys(districts).map((district) => ({
              value: district,
              label: district,
            }));
            setDistrictsOptions(districtOptions);
            setIsLoading((prev) => ({ ...prev, districts: false }));

            // Set selected district if exists
            if (defaultAddress.district && districts[defaultAddress.district]) {
              const districtOption = districtOptions.find(
                (d) => d.value === defaultAddress.district
              );
              setSelectedDistrict(districtOption || null);

              // Initialize subdistricts if district exists
              const subdistrictData = districts[defaultAddress.district];
              const subdistrictOptions = subdistrictData["sub-districts"].map(
                (subdistrict, index) => ({
                  value: subdistrict,
                  label: subdistrict,
                  postalCode: subdistrictData["postal-code"][index],
                })
              );
              setSubdistrictsOptions(subdistrictOptions);
              setIsLoading((prev) => ({ ...prev, subdistricts: false }));

              // Set selected subdistrict if exists
              if (defaultAddress.subDistrict) {
                const subdistrictOption = subdistrictOptions.find(
                  (s) => s.value === defaultAddress.subDistrict
                );
                setSelectedSubdistrict(subdistrictOption || null);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error initializing form:", error);
        setIsLoading({
          provinces: false,
          districts: false,
          subdistricts: false,
        });
      }
    };

    initializeForm();
  }, [defaultAddress, selectedCountry]);

  const handleCountryChange = (value: Option) => {
    setSelectedCountry(value);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
    resetField("province");
    resetField("district");
    resetField("subdistrict");
    resetField("postalCode");

    const countryData = typedLocationData[value.value];
    if (countryData) {
      setIsLoading((prev) => ({ ...prev, provinces: true }));
      const provinceOptions = Object.keys(countryData.provinces).map(
        (province) => ({
          value: province,
          label: province,
        })
      );
      setProvincesOptions(provinceOptions);
      setIsLoading((prev) => ({ ...prev, provinces: false }));
    }
  };

  const handleProvinceChange = (value: Option | null) => {
    setSelectedProvince(value);
    setSelectedDistrict(null);
    setSelectedSubdistrict(null);
    resetField("district");
    resetField("subdistrict");
    resetField("postalCode");

    if (value && selectedCountry) {
      const countryData = typedLocationData[selectedCountry.value];
      if (countryData?.provinces[value.value]) {
        setIsLoading((prev) => ({ ...prev, districts: true }));
        const districtOptions = Object.keys(
          countryData.provinces[value.value].districts
        ).map((district) => ({
          value: district,
          label: district,
        }));
        setDistrictsOptions(districtOptions);
        setIsLoading((prev) => ({ ...prev, districts: false }));
      }
    }
  };

  const handleDistrictChange = (value: Option | null) => {
    setSelectedDistrict(value);
    setSelectedSubdistrict(null);
    resetField("subdistrict");
    resetField("postalCode");

    if (value && selectedProvince && selectedCountry) {
      const countryData = typedLocationData[selectedCountry.value];
      const provinceData = countryData?.provinces[selectedProvince.value];
      if (provinceData?.districts[value.value]) {
        setIsLoading((prev) => ({ ...prev, subdistricts: true }));
        const subdistrictData = provinceData.districts[value.value];
        const subdistrictOptions = subdistrictData["sub-districts"].map(
          (subdistrict, index) => ({
            value: subdistrict,
            label: subdistrict,
            postalCode: subdistrictData["postal-code"][index],
          })
        );
        setSubdistrictsOptions(subdistrictOptions);
        setIsLoading((prev) => ({ ...prev, subdistricts: false }));
      }
    }
  };

  const handleSubdistrictChange = (value: Option | null) => {
    setSelectedSubdistrict(value);
    // alert(value)
    if (value) {
      setValue("postalCode", value.postalCode ?? "");
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (Object.keys(errors).length === 0) {
        setAddressData({
          name: value.name,
          phone_no: `${selectedCountry.dialCode} ${value.phone}`.trim(),
          note: value.note,
          address: value.address,
          district: selectedDistrict?.value || "",
          country: selectedCountry.value,
          province: selectedProvince?.value || "",
          subDistrict: value.subdistrict || "",
          postal_code: value.postalCode,
          isActive: value.isActive,
          id: value.addressID ?? undefined,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [
    watch,
    selectedCountry,
    selectedProvince,
    selectedDistrict,
    selectedSubdistrict,
    setAddressData,
    errors,
  ]);

  return (
    <FormProvider {...methods}>
      <div className="p-4 max-w-full mx-auto space-y-4">
        <BasicInput label="Name" name="name" type="text" />

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <div className="flex items-center gap-2">
              <Select
                options={getCountryOptions}
                value={selectedCountry}
                onChange={(value) => {
                  if (value) handleCountryChange(value);
                }}
                className="flex-1 min-w-[120px]"
                isSearchable
                placeholder="Select country"
              />
              <BasicInput
                label=""
                name="phone"
                type="tel"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid phone number",
                  },
                  minLength: {
                    value: 8,
                    message: "Phone number must be at least 8 digits",
                  },
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              value={selectedCountry.label}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Province</label>
            <Controller
              name="province"
              control={control}
              rules={{ required: "Province is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    options={provincesOptions}
                    value={selectedProvince}
                    onChange={(value) => {
                      handleProvinceChange(value);
                      field.onChange(value?.value);
                    }}
                    className="mt-1"
                    isLoading={isLoading.provinces}
                    isDisabled={isLoading.provinces}
                    isSearchable
                    placeholder="Select province"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">District</label>
            <Controller
              name="district"
              control={control}
              rules={{ required: "District is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    options={districtsOptions}
                    value={selectedDistrict}
                    onChange={(value) => {
                      handleDistrictChange(value);
                      field.onChange(value?.value);
                    }}
                    className="mt-1"
                    isLoading={isLoading.districts}
                    isDisabled={!selectedProvince || isLoading.districts}
                    isSearchable
                    placeholder="Select district"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Subdistrict
            </label>
            <Controller
              name="subdistrict"
              control={control}
              rules={{ required: "Subdistrict is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Select
                    options={subdistrictsOptions}
                    value={selectedSubdistrict}
                    onChange={(value) => {
                      handleSubdistrictChange(value);
                      field.onChange(value?.value);
                    }}
                    className="mt-1"
                    isLoading={isLoading.subdistricts}
                    isDisabled={!selectedDistrict || isLoading.subdistricts}
                    isSearchable
                    placeholder="Select subdistrict"
                  />
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <BasicInput
            label="Postal Code"
            name="postalCode"
            type="text"
            rules={{
              required: "Postal code is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Postal code must be numeric",
              },
            }}
          />

          <BasicInput
            label="Note (Optional)"
            name="note"
            type="text"
            isTextArea
          />

          <BasicInput
            label="Address"
            name="address"
            type="text"
            isTextArea
            rules={{ required: "Address is required" }}
          />

          <div className="mb-4">
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-slate-950 dark:text-gray-100"
                  >
                    Set as default address
                  </label>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddressForm;
